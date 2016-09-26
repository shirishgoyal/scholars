import io
import os
import subprocess

from apiclient import discovery
from apiclient.http import MediaIoBaseDownload
from django.conf import settings
from django.core.files import File
from httplib2 import Http
from oauth2client.service_account import ServiceAccountCredentials

SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly', 'https://www.googleapis.com/auth/drive',
          'https://www.googleapis.com/auth/drive.file']
FFMPEG_BIN = "ffmpeg"
MENCODER_BIN = "mencoder"


def get_credentials(scopes=SCOPES):
    """Gets valid user credentials from storage.
    If nothing has been stored, or if the stored credentials are invalid,
    the OAuth2 flow is completed to obtain the new credentials.
    Returns:
        Credentials, the obtained credential.
    """
    # home_dir = os.path.expanduser('~')
    # credential_dir = os.path.join(home_dir, '.credentials')
    # if not os.path.exists(credential_dir):
    #     os.makedirs(credential_dir)

    credential_path = os.path.join(settings.ROOT_DIR, settings.GOOGLE_DRIVE_STORAGE_JSON_KEY_FILE)
    credentials = ServiceAccountCredentials.from_json_keyfile_name(credential_path, scopes=scopes)
    return credentials


def import_presentation(model_id, file_id):
    credentials = get_credentials()
    http = credentials.authorize(Http())
    service = discovery.build('drive', 'v3', http=http)

    # files = service.files().list().execute()
    # for f in files['files']:
    #     print f['name']

    folder = os.path.join(settings.MEDIA_ROOT, '%d' % model_id)
    if not os.path.exists(folder):
        os.makedirs(folder)

    pdf = os.path.join(folder, 'slides.pdf')
    pptx = os.path.join(folder, 'slides.pptx')

    export_file(service=service, model_id=model_id, file_id=file_id, mime_type='application/pdf', name="slides.pdf")
    export_file(service=service, model_id=model_id, file_id=file_id,
                mime_type='application/vnd.openxmlformats-officedocument.presentationml.presentation',
                name="slides.pptx")

    generate_images(pdf, folder, model_id)
    generate_notes(pptx, folder, model_id)


def export_video(model_id):
    folder = os.path.join(settings.MEDIA_ROOT, '%d' % model_id)
    if not os.path.exists(folder):
        os.makedirs(folder)

    images_folder = os.path.join(folder, "images")
    total = len([name for name in os.listdir(images_folder) if '.png' in name])

    generate_video_slides(total, folder)
    merge_video(folder)


def export_file(service, model_id, file_id, mime_type, name):
    request = service.files().export_media(fileId=file_id,
                                           mimeType=mime_type)

    folder = os.path.join(settings.MEDIA_ROOT, '%d' % model_id)
    if not os.path.exists(folder):
        os.makedirs(folder)

    filename = os.path.join(folder, name)
    fh = io.FileIO(filename, 'wb')
    downloader = MediaIoBaseDownload(fh, request)
    downloader.next_chunk()

    # done = False
    # while done is False:
    #     status, done = downloader.next_chunk()
    #     print "Download %d%%." % int(status.progress() * 100)


def clear_folder(folder):
    import os, shutil
    for the_file in os.listdir(folder):
        file_path = os.path.join(folder, the_file)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print e


def generate_images(pdf, folder, model_id):
    from wand.image import Image
    from wand.color import Color
    from courses.models import Slide

    image_folder = os.path.join(folder, 'images')
    if not os.path.exists(image_folder):
        os.makedirs(image_folder)

    clear_folder(image_folder)

    total = 0

    with Image(filename=pdf, resolution=300) as img:
        img.background_color = Color("white")
        img.alpha_channel = False
        img.save(filename=os.path.join(image_folder, '%03d.png'))
        total = len(img.sequence)

    # get slide for this image in the course
    for count in range(total):
        image_filepath = os.path.join(image_folder, '%03d.png' % count)

        position = count
        slide, created = Slide.objects.get_or_create(position=position, course_id=model_id)
        slide.image.save(
            os.path.basename(image_filepath),  # filename
            File(open(image_filepath)),  # image file
            save=True  # save slide object
        )

    return total


def slide_number_from_xml_file(filename):
    """
    Integer slide number from filename

    Assumes /path/to/Slidefile/somekindofSlide36.something
    """
    return int(filename[filename.rfind("Slide") + 5:filename.rfind(".")])


def generate_notes(pptx, folder, model_id):
    import os, glob
    from zipfile import ZipFile
    from xml.dom.minidom import parse
    from courses.models import Slide

    tmp_folder = os.path.join(folder, 'tmp')
    if not os.path.exists(tmp_folder):
        os.makedirs(tmp_folder)

    # extract the pptx file as a zip archive
    # note: only extract from pptx files that you trust. they could potentially overwrite your important files.
    clear_folder(tmp_folder)

    ZipFile(pptx).extractall(path=tmp_folder, pwd=None)
    path = os.path.join(tmp_folder, "ppt", "notesSlides")

    notes_folder = os.path.join(folder, 'notes')
    if not os.path.exists(notes_folder):
        os.makedirs(notes_folder)

    notesDict = {}

    # Get the xml we extracted from the zip file
    xmlfiles = glob.glob(os.path.join(path, '*.xml'))

    for infile in sorted(xmlfiles, key=slide_number_from_xml_file):
        # parse each XML notes file from the notes folder.
        dom = parse(infile)
        noteslist = dom.getElementsByTagName('a:t')
        if len(noteslist) == 0:
            continue

        # separate last element of noteslist for use as the slide marking.
        slideNumber = slide_number_from_xml_file(infile)
        # start with this empty string to build the presenter note itself
        tempstring = ''

        for node in noteslist:
            xmlTag = node.toxml()
            xmlData = xmlTag.replace('<a:t>', '').replace('</a:t>', '').replace('<a:t/>', '')
            # concatenate the xmlData to the tempstring for the particular slideNumber index.
            tempstring = tempstring + xmlData + '\n\n'

        # store the tempstring in the dictionary under the slide number
        notesDict[slideNumber] = tempstring

        # get slide for this note in the course
        position = int(slideNumber) - 1
        slide, created = Slide.objects.get_or_create(position=position, course_id=model_id)

        if not created and slide.notes != tempstring:
            slide.status = Slide.STATUS.draft
        slide.notes = tempstring
        slide.save()

        filename = os.path.join(notes_folder, "%03d.txt" % position)
        with open(filename, 'w') as f:
            f.write(tempstring.encode('utf-8', 'ignore'))


def generate_video_slides(total, folder):
    video_folder = os.path.join(folder, 'videos')
    if not os.path.exists(video_folder):
        os.makedirs(video_folder)

    clear_folder(video_folder)

    filename = os.path.join(folder, "videos", "video.txt")
    file = open(filename, "w")

    for count in range(total):
        sequence = '%03d' % count
        generate_video(folder, sequence)

        video_seq = os.path.join(folder, 'videos/%s.mpg' % sequence)
        file.write(" %s" % video_seq)
        # file.write("file '%s'\n" % video_seq)

    file.close()


def generate_video(folder, sequence):
    print "Generating frames..."

    # ffmpeg -r 25 -i %02d.png -c:v libx264 -r 30 -pix_fmt yuv420p slideshow.mp4
    # ffmpeg -loop 1 -i image.jpg -i audio.wav -c:v libx264 -tune stillimage -c:a aac -strict experimental -b:a 192k -pix_fmt yuv420p -shortest out.mp4

    audio_seq = os.path.join(folder, 'audio/%s.mp3' % sequence)
    image_seq = os.path.join(folder, 'images/%s.png' % sequence)
    video_seq = os.path.join(folder, 'videos/%s.mpg' % sequence)

    # check if audio exists for slide
    if os.path.exists(audio_seq):
        command = [FFMPEG_BIN,
                   '-y',  # (optional) overwrite output file if it exists
                   '-loop', '1',
                   '-i', image_seq,  # input comes from a folder
                   '-i', audio_seq,  # input comes from a folder
                   '-strict', 'experimental',
                   '-tune', 'stillimage',
                   '-c:v', 'mpeg2video',  # video encoder
                   '-c:a', 'mp2',  # audio format
                   '-b:a', '192k',  # audio rate
                   '-ac', '2',  # audio channels
                   '-pix_fmt', 'yuv420p',
                   '-shortest',  # map audio to full video length
                   video_seq]
    else:
        command = [FFMPEG_BIN,
                   '-y',  # (optional) overwrite output file if it exists
                   '-loop', '1',
                   '-i', image_seq,  # input comes from a folder
                   '-c:v', 'mpeg2video',
                   '-t', '5',  # duration
                   '-pix_fmt', 'yuv420p',
                   '-an',  # Tells FFMPEG not to expect any audio
                   video_seq]

    subprocess.call(command, stdout=None, stderr=subprocess.STDOUT)


def merge_video(folder):
    print "Generating video..."

    video_spec = os.path.join(folder, "videos", "video.txt")
    video_path = os.path.join(folder, "videos", "video.mpg")
    video_mp4_path = os.path.join(folder, "videos", "video.mp4")

    with open(video_spec, "r") as videos:
        video_list = videos.read()

    command = ["cat",
               video_list,
               '>',
               video_path]

    # mencoder -oac pcm -ovc copy <<filenames separated by spaces>> -o video_path
    # command = [MENCODER_BIN,
    #            '-oac', 'pcm',
    #            '-ovc', 'copy',
    #            video_list,
    #            '-o', video_path]

    # ffmpeg -f concat -i mylist.txt -c copy output
    # command = [FFMPEG_BIN,
    #            '-f', 'concat',
    #            '-safe', '0',
    #            '-i', video_spec,
    #            '-c', 'copy',
    #            video_path]

    subprocess.call(command, stdout=None, stderr=subprocess.STDOUT)

    # ffmpeg -i inter.mpg -qscale:v 2 output.mp4
    command = [FFMPEG_BIN,
               '-i', video_path,
               '-qscale:v', '2',
               video_mp4_path]

    subprocess.call(command, stdout=None, stderr=subprocess.STDOUT)


def image_url_to_gid(url):
    import re
    return re.search(r'file/d/(\S*)/view', url).group(1)


def image_url_to_gdrive_url(url):
    return u'<img src="%s" style="max-width:120px;max-height:100px" />' % (
        "https://drive.google.com/uc?id=%s" % image_url_to_gid(url))
