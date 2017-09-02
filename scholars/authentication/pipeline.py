import hashlib

from social_core.exceptions import AuthAlreadyAssociated, AuthException


def auto_logout(*args, **kwargs):
    """Do not compare current user with new one"""
    return {'user': None}


def check_email_present(backend, uid, user=None, *args, **kwargs):
    if not kwargs['details'].get('email'):
        raise AuthException(backend, "Email wasn't provided by oauth provider")


def social_user(backend, uid, user=None, *args, **kwargs):
    provider = backend.name

    social = backend.strategy.storage.user.get_social_auth(provider, uid)

    if social:
        # can happen when user has multiple accounts with same email (apply email uniqueness strictly)
        if user and social.user != user:
            msg = 'This {0} account is already in use.'.format(provider)
            raise AuthAlreadyAssociated(backend, msg)
        elif not user:
            user = social.user
    return {'social': social,
            'user': user,
            'is_new': user is None,
            'new_association': social is None}


def save_avatar(strategy, details, user=None, *args, **kwargs):
    """Get user avatar from social provider."""
    if user:
        backend_name = kwargs['backend'].__class__.__name__.lower()
        response = kwargs.get('response', {})

        avatar = None

        if 'google-oauth2' in backend_name and response.get('image', {}).get('url'):
            avatar = response['image']['url'].split('?')[0]
        else:
            avatar = 'http://www.gravatar.com/avatar/'
            avatar += hashlib.md5(user.email.lower().encode('utf8')).hexdigest()
            avatar += '?size=100'
        if avatar and user.avatar != avatar:
            user.avatar = avatar
            strategy.storage.user.changed(user)
