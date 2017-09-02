(function () {
    'use strict';

    angular.module('BlurAdmin.pages.page')
        .controller('CourseDetailCtrl', CourseDetailCtrl);

    /** @ngInject */
    function CourseDetailCtrl($scope, $state, $stateParams, $log, lodash, Auth, Course) {
        var vm = this;

        vm.account = {};
        vm.isAuthenticated = Auth.isAuthenticated();
        vm.submitted = false;
        vm.errors = {};

        vm.has_error = has_error;

        vm.papers = [
            {
                "name": "Mastering the Game of Go with Deep Neural Networks and Tree Search",
                "doi": "10.1038/nature16961",
                "video_links": [
                    {
                        "url": "https://youtu.be/MXVyITzDzu0",
                        "name": "Hindi",
                        "id": 43
                    },
                    {
                        "url": "https://youtu.be/q4hcXtUxUxA",
                        "name": "Catalan",
                        "id": 39
                    },
                    {
                        "url": "https://youtu.be/s6S55XSRVFM",
                        "name": "Spanish",
                        "id": 37
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www.nature.com/nature/journal/v529/n7587/full/nature16961.html",
                        "name": "Nature"
                    },
                    {
                        "url": "http://airesearch.com/wp-content/uploads/2016/01/deepmind-mastering-go.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Anshu Aviral",
                    "Venkata Karthik Gullapalli"
                ],
                "video": "https://youtu.be/F2uBxrnfgVA",
                "id": 18,
                "pdf": "http://airesearch.com/wp-content/uploads/2016/01/deepmind-mastering-go.pdf",
                "audio": [
                    "Niresh Jain",
                    "Venkata Karthik Gullapalli"
                ],
                "scripting": [
                    "Anshu Aviral",
                    "Venkata Karthik Gullapalli",
                    "Gagana B",
                    "Tejas Sarma",
                    "Niresh Jain",
                    "Lenny Khazan",
                    "Rashida Taskin",
                    "Tzu Kit Chan"
                ],
                "description": "David Silver, at. al. 2016. Mastering the Game of Go with Deep Neural Networks and Tree Search. Nature 529, 484–489 (28 January 2016)"
            },
            {
                "name": "Learning to Learn by Gradient Descent by Gradient Descent",
                "doi": "10.1145/2939672.2945358",
                "video_links": [
                    {
                        "url": "https://youtu.be/6KbfZxJveiw",
                        "name": "Catalan",
                        "id": 40
                    },
                    {
                        "url": "https://youtu.be/gBugb6SAMaI",
                        "name": "Spanish",
                        "id": 38
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://papers.nips.cc/paper/6461-learning-to-learn-by-gradient-descent-by-gradient-descent.pdf",
                        "name": "NIPS"
                    },
                    {
                        "url": "https://papers.nips.cc/paper/6461-learning-to-learn-by-gradient-descent-by-gradient-descent.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Afelio Padilla"
                ],
                "video": "https://youtu.be/yxGyNv0Kjcs",
                "id": 21,
                "pdf": "https://papers.nips.cc/paper/6461-learning-to-learn-by-gradient-descent-by-gradient-descent.pdf",
                "audio": [
                    "Naveena Benjamin"
                ],
                "scripting": [
                    "Afelio Padilla",
                    "Rohan Kapur",
                    "Sukanya Mandal",
                    "Naveena Benjamin",
                    "Saurabh Vyas",
                    "Lenny Khazan",
                    "Umang Sehgal"
                ],
                "description": "Marcin Andrychowicz, at. al. 2016. Learning to Learn by Gradient Descent by Gradient Descent. In Proceedings of the 30th Conference on Neural Information Processing Systems (NIPS 2016), Barcelona, Spain."
            },
            {
                "name": "Growing Wikipedia Across Languages via Recommendation",
                "doi": "10.1145/2872427.2883077",
                "video_links": [
                    {
                        "url": "https://youtu.be/gig5vjNgTHg",
                        "name": "Catalan",
                        "id": 42
                    },
                    {
                        "url": "https://youtu.be/gtqqzFk4e6E",
                        "name": "Spanish",
                        "id": 41
                    },
                    {
                        "url": "",
                        "name": "Greek",
                        "id": 243
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2883077",
                        "name": "ACM"
                    },
                    {
                        "url": "https://cs.stanford.edu/people/jure/pubs/growing-www16.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Giri Bhatnagar",
                    "Sourav Singh"
                ],
                "video": "https://youtu.be/xnn5_ObBk2o",
                "id": 41,
                "pdf": "https://cs.stanford.edu/people/jure/pubs/growing-www16.pdf",
                "audio": [
                    "Tzu Kit Chan"
                ],
                "scripting": [],
                "description": "Ellery Wulczyn, at. al. 2016. Growing Wikipedia Across Languages via Recommendation. In Proceedings of the 25th International Conference on World Wide Web (WWW 2016)."
            },
            {
                "name": "HypTrails: A Bayesian Approach for Comparing Hypotheses About Human Trails on the Web",
                "doi": "10.1145/2736277.2741080",
                "video_links": [
                    {
                        "url": "https://youtu.be/1k_KtqMaQLc",
                        "name": "Hindi",
                        "id": 30
                    },
                    {
                        "url": "https://youtu.be/Gs581Q6BHII",
                        "name": "Malayalam",
                        "id": 31
                    },
                    {
                        "url": "https://youtu.be/Wg5FQ55UJYs",
                        "name": "Spanish",
                        "id": 35
                    },
                    {
                        "url": "https://youtu.be/p3KxwVHdJ2Y",
                        "name": "Catalan",
                        "id": 36
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2741080",
                        "name": "ACM"
                    },
                    {
                        "url": "http://www.www2015.it/documents/proceedings/proceedings/p1003.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Afelio Padilla",
                    "Anshu Aviral"
                ],
                "video": "https://youtu.be/Aj9Q6R6pVII",
                "id": 16,
                "pdf": "http://www.www2015.it/documents/proceedings/proceedings/p1003.pdf",
                "audio": [
                    "Naveena Benjamin",
                    "Anshu Aviral"
                ],
                "scripting": [],
                "description": "Philipp Singer, at. al. 2015. HypTrails: A Bayesian Approach for Comparing Hypotheses About Human Trails on the Web. In Proceedings of the 24th International Conference on World Wide Web."
            },
            {
                "name": "Secrets, Lies, and Account Recovery: Lessons from the Use of Personal Knowledge Questions at Google",
                "doi": "10.1145/2736277.2741691",
                "video_links": [
                    {
                        "url": "https://youtu.be/u-crvvxfnlo",
                        "name": "Spanish",
                        "id": 32
                    },
                    {
                        "url": "https://youtu.be/7qW5h8Wd9BE",
                        "name": "Catalan",
                        "id": 33
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2741691",
                        "name": "ACM"
                    },
                    {
                        "url": "http://research.google.com/pubs/pub43783.html",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Venkata Karthik Gullapalli",
                    "Gagana B"
                ],
                "video": "https://youtu.be/h8YwQvJm7rk",
                "id": 17,
                "pdf": "http://research.google.com/pubs/pub43783.html",
                "audio": [
                    "Rashida Taskin",
                    "Venkata Karthik Gullapalli"
                ],
                "scripting": [],
                "description": "Joseph Bonneau, at. al. 2015. Secrets, lies, and account recovery: Lessons from the use of personal knowledge questions at Google. In Proceedings of the 24th International Conference on World Wide Web."
            },
            {
                "name": "Crowdsourcing Annotations of Websites’ Privacy Policies: Can It Really Work?",
                "doi": "10.1145/2872427.2883035",
                "video_links": [
                    {
                        "url": "https://youtu.be/H7Y3s9X__M8",
                        "name": "Catalan",
                        "id": 23
                    },
                    {
                        "url": "https://youtu.be/-vDR939Wiuk",
                        "name": "Spanish",
                        "id": 22
                    },
                    {
                        "url": "https://youtu.be/uxNSZ9o7sk0&",
                        "name": "Romanian",
                        "id": 34
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2883035",
                        "name": "ACM"
                    },
                    {
                        "url": "http://homes.cs.washington.edu/~nasmith/papers/wilson+etal.www16.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Ayush Shah",
                    "Tejas Sarma"
                ],
                "video": "https://youtu.be/h7Ye23GC77M",
                "id": 10,
                "pdf": "http://homes.cs.washington.edu/~nasmith/papers/wilson+etal.www16.pdf",
                "audio": [
                    "Ayush Shah"
                ],
                "scripting": [],
                "description": "Shomir Wilson, at. al. 2016. Crowdsourcing Annotations of Websites’ Privacy Policies: Can It Really Work?. In Proceedings of the 25th International Conference on World Wide Web (WWW 2016)."
            },
            {
                "name": "Social Networks Under Stress",
                "doi": "10.1145/2872427.2883063",
                "video_links": [
                    {
                        "url": "https://youtu.be/LUJb26_LSW0",
                        "name": "Catalan",
                        "id": 25
                    },
                    {
                        "url": "https://youtu.be/ARH5a1PUzwE",
                        "name": "Spanish",
                        "id": 24
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2883063",
                        "name": "ACM"
                    },
                    {
                        "url": "https://arxiv.org/pdf/1602.00572.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Giulia Paris",
                    "Rohan Kapur",
                    "Debarati Das"
                ],
                "video": "https://youtu.be/FIX2uls7fX8",
                "id": 9,
                "pdf": "https://arxiv.org/pdf/1602.00572.pdf",
                "audio": [
                    "Giulia Paris",
                    "Rohan Kapur",
                    "Debarati Das"
                ],
                "scripting": [],
                "description": "Daniel M. Romero, at. al. 2016. Social Networks Under Stress. In Proceedings of the 25th International Conference on World Wide Web (WWW 2016)."
            },
            {
                "name": "Visualizing Large-scale and High-dimensional Data",
                "doi": "10.1145/2872427.2883041",
                "video_links": [
                    {
                        "url": "https://youtu.be/GqLkm5zlVXM",
                        "name": "Hindi",
                        "id": 115
                    },
                    {
                        "url": "https://youtu.be/x_jy7G3Jp8s",
                        "name": "Catalan",
                        "id": 29
                    },
                    {
                        "url": "https://youtu.be/pAvdSxXV_jE",
                        "name": "Spanish",
                        "id": 28
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2883041",
                        "name": "ACM"
                    },
                    {
                        "url": "https://arxiv.org/pdf/1602.00370v2.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Afelio Padilla",
                    "Anshu Aviral"
                ],
                "video": "https://youtu.be/XRnPTBBQPAQ",
                "id": 11,
                "pdf": "https://arxiv.org/pdf/1602.00370v2.pdf",
                "audio": [
                    "Naveena Benjamin"
                ],
                "scripting": [],
                "description": "Jian Tang, at. al. 2016. Visualizing Large-scale and High-dimensional Data. In Proceedings of the 25th International Conference on World Wide Web (WWW 2016)."
            },
            {
                "name": "Using Hierarchical Skills for Optimized Task Assignment in Knowledge-intensive Crowdsourcing",
                "doi": "10.1145/2872427.2883070",
                "video_links": [
                    {
                        "url": "https://youtu.be/pUKSKlrM1cI",
                        "name": "Catalan",
                        "id": 27
                    },
                    {
                        "url": "https://youtu.be/9WlafrV_wQo",
                        "name": "Spanish",
                        "id": 26
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2883070",
                        "name": "ACM"
                    },
                    {
                        "url": "http://www2016.net/proceedings/proceedings/p843.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Venkata Karthik Gullapalli",
                    "Gargi Sharma"
                ],
                "video": "https://youtu.be/pQPH454oL9o",
                "id": 12,
                "pdf": "http://www2016.net/proceedings/proceedings/p843.pdf",
                "audio": [
                    "Arzoo Sethi",
                    "Venkata Karthik Gullapalli"
                ],
                "scripting": [],
                "description": "Panagiotis Mavridis, at. al. 2016. Using Hierarchical Skills for Optimized Task Assignment in Knowledge-intensive Crowdsourcing. In Proceedings of the 25th International Conference on World Wide Web."
            },
            {
                "name": "Wander Join: Online Aggregation via Random Walks",
                "doi": "10.1145/2882903.2915235",
                "video_links": [
                    {
                        "url": "https://youtu.be/Vgb95vZULUo",
                        "name": "Spanish",
                        "id": 129
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2915235",
                        "name": "ACM"
                    },
                    {
                        "url": "https://www.cse.ust.hk/~yike/sigmod16.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Freddie Vargus",
                    "Anshu Aviral"
                ],
                "video": "https://youtu.be/0x0a4BDkEKQ",
                "id": 74,
                "pdf": "https://www.cse.ust.hk/~yike/sigmod16.pdf",
                "audio": [
                    "Rashmi Nagpal",
                    "Ayush Pareek"
                ],
                "scripting": [
                    "Freddie Vargus",
                    "Anshu Aviral",
                    "Rashmi Nagpal",
                    "Ayush Pareek",
                    "TK Sourabh",
                    "Kewal Shah"
                ],
                "description": "Published on Jan 08, 2017 - ACM link - Public link - SIGMOD 2016 (best paper)"
            },
            {
                "name": "Hierarchical Finite State Controllers for Generalized Planning",
                "doi": "",
                "video_links": [
                    {
                        "url": "https://youtu.be/26MK9Vq4mKM",
                        "name": "Hindi",
                        "id": 128
                    },
                    {
                        "url": "https://youtu.be/3xD5-Z97rCI",
                        "name": "Chinese",
                        "id": 234
                    },
                    {
                        "url": "https://youtu.be/xse3CmhJhOo",
                        "name": "Spanish",
                        "id": 116
                    },
                    {
                        "url": "https://youtu.be/DtAaf1V76Jc",
                        "name": "Catalan",
                        "id": 117
                    },
                    {
                        "url": "https://youtu.be/lJ1dfqzL6QE",
                        "name": "Filipino",
                        "id": 246
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www.ijcai.org/Proceedings/16/Papers/458.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Binit Kumar"
                ],
                "video": "https://youtu.be/2lDzMuBWuqA",
                "id": 81,
                "pdf": "http://www.ijcai.org/Proceedings/16/Papers/458.pdf",
                "audio": [
                    "Zafarali Ahmed",
                    "Siddharth Raja"
                ],
                "scripting": [
                    "Binit Kumar",
                    "Ayush Pareek",
                    "Zafarali Ahmed",
                    "Siddharth Raja",
                    "Niresh Jain",
                    "Tzu Kit Chan",
                    "Ahmed Bekhit"
                ],
                "description": "Published on Jan 08, 2017 - Public link - IJCAI 2016 (best paper)"
            },
            {
                "name": "Deep Residual Learning for Image Recognition",
                "doi": "10.1109/CVPR.2016.90",
                "video_links": [
                    {
                        "url": "https://youtu.be/3c9rZ4ydQCk",
                        "name": "Hindi",
                        "id": 133
                    },
                    {
                        "url": "https://youtu.be/zwOeY8t_FXg",
                        "name": "Spanish",
                        "id": 119
                    },
                    {
                        "url": "https://youtu.be/qZMr91xz7hQ",
                        "name": "Catalan",
                        "id": 121
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www.cv-foundation.org/openaccess/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Tejas Sarma",
                    "Ayush Singh"
                ],
                "video": "https://youtu.be/hwMsKmgopSU",
                "id": 93,
                "pdf": "http://www.cv-foundation.org/openaccess/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf",
                "audio": [
                    "Srishti Sharma",
                    "Ayush Pareek"
                ],
                "scripting": [
                    "Tejas Sarma",
                    "Ayush Singh",
                    "Srishti Sharma",
                    "Ayush Pareek",
                    "Aditya Sista",
                    "Prachi Manchanda",
                    "Aseem Saxena",
                    "Kewal Shah",
                    "Dhruv Ramani"
                ],
                "description": "Published on Jan 08, 2017 - Public link - CVPR 2016 (best paper)"
            },
            {
                "name": "FRAUDAR: Bounding Graph Fraud in the Face of Camouflage",
                "doi": "10.1145/2939672.2939747",
                "video_links": [
                    {
                        "url": "https://youtu.be/FslD8MhPOSk",
                        "name": "Malayalam",
                        "id": 118
                    },
                    {
                        "url": "https://youtu.be/QUVrrK5VF3Y",
                        "name": "Spanish",
                        "id": 131
                    },
                    {
                        "url": "https://youtu.be/LmsbBiqiMvA",
                        "name": "Catalan",
                        "id": 114
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www.kdd.org/kdd2016/papers/files/rfp0110-hooiA.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Afelio Padilla",
                    "Naveena Benjamin",
                    "Swapneel Mehta",
                    "Raviteja Chunduru"
                ],
                "video": "https://youtu.be/B8dJgC4MkPY",
                "id": 85,
                "pdf": "http://www.kdd.org/kdd2016/papers/files/rfp0110-hooiA.pdf",
                "audio": [
                    "Naveena Benjamin",
                    "Ayush Pareek"
                ],
                "scripting": [
                    "Afelio Padilla",
                    "Naveena Benjamin",
                    "Swapneel Mehta",
                    "Ayush Pareek",
                    "Aseem Saxena",
                    "Yeison Vagas",
                    "Priya Arora",
                    "Raviteja Chunduru",
                    "Sukanya Mandal"
                ],
                "description": "Published on Jan 08, 2017 - Public link - KDD 2016 (best paper)"
            },
            {
                "name": "Beyond Ranking: Optimizing Whole-Page Presentation",
                "doi": "10.1145/2835776.2835824",
                "video_links": [
                    {
                        "url": "https://youtu.be/155xtv-LpoU",
                        "name": "Spanish",
                        "id": 124
                    },
                    {
                        "url": "https://youtu.be/KU34w_YE-Po",
                        "name": "Catalan",
                        "id": 123
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www-personal.umich.edu/~raywang/pub/wsdm402-wang.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Ayush Pareek",
                    "Venkata Karthik Gullapalli",
                    "Shivank Awasthi"
                ],
                "video": "https://youtu.be/1LGJmFadtoI",
                "id": 99,
                "pdf": "http://www-personal.umich.edu/~raywang/pub/wsdm402-wang.pdf",
                "audio": [
                    "Taoxi (Tessa) Li",
                    "Ayush Pareek"
                ],
                "scripting": [
                    "Ayush Pareek",
                    "Venkata Karthik Gullapalli",
                    "Taoxi (Tessa) Li",
                    "Niresh Jain",
                    "Shivank Awasthi",
                    "Bofin Babu",
                    "Juhi Parekh"
                ],
                "description": "Published on Jan 08, 2017 - Public link - WSDM 2016 (best paper)"
            },
            {
                "name": "Haptic Wave: A Cross-Modal Interface for Visually Impaired Audio Producers",
                "doi": "10.1145/2858036.2858304",
                "video_links": [
                    {
                        "url": "https://youtu.be/unCNVFu2Yro",
                        "name": "Chinese",
                        "id": 127
                    },
                    {
                        "url": "https://youtu.be/F4Lz1Q73k58",
                        "name": "Spanish",
                        "id": 126
                    },
                    {
                        "url": "https://youtu.be/HwcBmAt9luE",
                        "name": "Japanese",
                        "id": 130
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://research.gold.ac.uk/17513/1/paper1345.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Niresh Jain",
                    "Akshat Mishra"
                ],
                "video": "https://youtu.be/-yiF3LpjiV4",
                "id": 105,
                "pdf": "http://research.gold.ac.uk/17513/1/paper1345.pdf",
                "audio": [
                    "Angela Pang",
                    "Taoxi (Tessa) Li"
                ],
                "scripting": [
                    "Niresh Jain",
                    "Akshat Mishra",
                    "Angela Pang",
                    "Taoxi (Tessa) Li",
                    "Ayush Pareek",
                    "Dinuka De Silva",
                    "Elroy Terzol",
                    "Hide Shidara",
                    "Mukunda Madhava Nath",
                    "Amrit Singh",
                    "Kewal Shah"
                ],
                "description": "Published on Jan 08, 2017 - Public link - CHI 2016 (best paper)"
            },
            {
                "name": "Community-based Data Validation Practices in Citizen Science",
                "doi": "10.1145/2818048.2820063",
                "pdf_links": [
                    {
                        "url": "http://openknowledge.umd.edu/wp-content/uploads/2015/11/proceedings.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Florin Cioloboc"
                ],
                "video": "https://youtu.be/csRe-swO_1U",
                "id": 96,
                "pdf": "http://openknowledge.umd.edu/wp-content/uploads/2015/11/proceedings.pdf",
                "audio": [
                    "Taoxi (Tessa) Li",
                    "Ayush Pareek"
                ],
                "scripting": [
                    "Florin Cioloboc",
                    "Taoxi (Tessa) Li",
                    "Ayush Pareek",
                    "Anshu Aviral",
                    "Matthew Cox",
                    "Shubham Tomar",
                    "Yogesh Kulkarni"
                ],
                "description": "Published on Jan 08, 2017 - Public link - CSCW 2016 (best paper)",
                "video_links": []

            },
            {
                "name": "Tightly CCA-Secure Encryption Without Pairings",
                "doi": "10.1007/978-3-662-49890-3_1",
                "pdf_links": [
                    {
                        "url": "https://eprint.iacr.org/2016/094.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Sarthak Munshi"
                ],
                "video": "https://youtu.be/8gZSfT4y44w",
                "id": 86,
                "pdf": "https://eprint.iacr.org/2016/094.pdf",
                "audio": [
                    "Sarthak Munshi",
                    "Nishant Kumar"
                ],
                "scripting": [
                    "Sarthak Munshi",
                    "Nishant Kumar",
                    "Ayush Pareek"
                ],
                "description": "Published on Jan 08, 2017 - Public link - EuroCrypt 2016 (best paper)",
                "video_links": []
            },
            {
                "name": "Asserting Reliable Convergence for Configuration Management Scripts",
                "doi": "10.1145/2983990.2984000",
                "video_links": [
                    {
                        "url": "https://youtu.be/texL9SOErps",
                        "name": "Spanish",
                        "id": 125
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://hummer.io/docs/2016-citac-oopsla.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Srishti Sharma"
                ],
                "video": "https://youtu.be/lRnktUidx64",
                "id": 87,
                "pdf": "http://hummer.io/docs/2016-citac-oopsla.pdf",
                "audio": [
                    "Ayush Pareek",
                    "Siddharth Dungarwal"
                ],
                "scripting": [
                    "Srishti Sharma",
                    "Ayush Pareek",
                    "Siddharth Dungarwal",
                    "Ankit Aggarwal"
                ],
                "description": "Published on Jan 08, 2017 - Public link - OOPSLA 2016 (best paper)"
            },
            {
                "name": "Bidirectional Search That Is Guaranteed to Meet in the Middle",
                "doi": "10.1145/2757001.2757009",
                "video_links": [
                    {
                        "url": "https://youtu.be/-3m-UQsQi6M",
                        "name": "Spanish",
                        "id": 236
                    },
                    {
                        "url": "https://youtu.be/8bypmOpbHaw",
                        "name": "Catalan",
                        "id": 237
                    },
                    {
                        "url": "https://youtu.be/YW5cKSjNX_Y",
                        "name": "Hindi",
                        "id": 238
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://webdocs.cs.ualberta.ca/~holte/Publications/MM-AAAI2016.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Suvarna Saumya",
                    "Anshu Aviral",
                    "Gargi Sharma"
                ],
                "video": "https://youtu.be/YIdF9CT7Mzo",
                "id": 210,
                "pdf": "http://webdocs.cs.ualberta.ca/~holte/Publications/MM-AAAI2016.pdf",
                "audio": [
                    "Tanveet Singh"
                ],
                "scripting": [
                    "Suvarna Saumya",
                    "Anshu Aviral",
                    "Gargi Sharma",
                    "Mashrin Srivastava",
                    "Harsh Vardhan",
                    "Sid Natham",
                    "Aman Achpal",
                    "Tanveet Singh",
                    "Kevin Le"
                ],
                "description": "Published on March 12, 2017 - Public link - AAAI 2016 (best paper)"
            },
            {
                "name": "From Non-Negative to General Operator Cost Partitioning",
                "doi": "10.3233/978-1-61499-419-0-765",
                "video_links": [
                    {
                        "url": "https://youtu.be/wR3dcxMM8mQ",
                        "name": "Hindi",
                        "id": 242
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://www.aaai.org/ocs/index.php/AAAI/AAAI15/paper/viewFile/9983/9762",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Shweta Singh",
                    "Ayush Sharma",
                    "Vineet Kumar"
                ],
                "video": "https://youtu.be/Yetdd95wPAk",
                "id": 224,
                "pdf": "https://www.aaai.org/ocs/index.php/AAAI/AAAI15/paper/viewFile/9983/9762",
                "audio": [
                    "Sarnath Kannan"
                ],
                "scripting": [
                    "Shweta Singh",
                    "Ayush Sharma",
                    "Vineet Kumar",
                    "Sarnath Kannan",
                    "Nishant Dhanendra",
                    "Yuno Cheng"
                ],
                "description": "Published on March 12, 2017 - Public link - AAAI 2015 (best paper)"
            },
            {
                "name": "Compressed Linear Algebra for Large-Scale Machine Learning",
                "doi": "10.14778/2994509.2994515",
                "pdf_links": [
                    {
                        "url": "http://www.vldb.org/pvldb/vol9/p960-elgohary.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Nishant Kumar",
                    "T K Sourabh",
                    "Nehul Yadav"
                ],
                "video": "https://youtu.be/J5g2DhIjHDw",
                "id": 223,
                "pdf": "http://www.vldb.org/pvldb/vol9/p960-elgohary.pdf",
                "audio": [
                    "Nishant Kumar"
                ],
                "scripting": [
                    "Nishant Kumar",
                    "T K Sourabh",
                    "Nehul Yadav",
                    "Kevin Le",
                    "Rai Pramodh",
                    "Bofin Babu",
                    "Ayush Pareek",
                    "Edwin Wan"
                ],
                "video_links": [],
                "description": "Published on March 12, 2017 - Public link - VLDB 2016 (best paper)"
            },
            {
                "name": "Rovables: Miniature On-Body Robots as Mobile Wearables",
                "doi": "10.1145/2984511.2984531",
                "video_links": [
                    {
                        "url": "https://youtu.be/to4iuhIFxEA",
                        "name": "Hindi",
                        "id": 244
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://shape.stanford.edu/research/rovables/Rovables_UIST_2016.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Hardik Surana",
                    "Rashmi Nagpal",
                    "Mukunda Madhava Nath"
                ],
                "video": "https://youtu.be/YaZupoNoOtE",
                "id": 221,
                "pdf": "http://shape.stanford.edu/research/rovables/Rovables_UIST_2016.pdf",
                "audio": [
                    "Rashmi Nagpal"
                ],
                "scripting": [
                    "Hardik Surana",
                    "Rashmi Nagpal",
                    "Mukunda Madhava Nath",
                    "Varun Gambhir",
                    "Soumya Jindal",
                    "Kevin Le",
                    "Aseem Saxena"
                ],
                "description": "Published on March 12, 2017 - Public link - UIST 2016 (best paper)"
            },
            {
                "name": "Social Media Participation in an Activist Movement for Racial Equality",
                "doi": "10.1145/2818052.2874314",
                "pdf_links": [
                    {
                        "url": "http://www.aaai.org/ocs/index.php/ICWSM/ICWSM16/paper/download/13168/12728",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Debarati Das",
                    "Srishti Sharma",
                    "Umair Muhammad"
                ],
                "video": "https://youtu.be/K7LN3MSovG0",
                "id": 176,
                "pdf": "http://www.aaai.org/ocs/index.php/ICWSM/ICWSM16/paper/download/13168/12728",
                "audio": [
                    "Debarati Das"
                ],
                "scripting": [
                    "Debarati Das",
                    "Srishti Sharma",
                    "Umair Muhammad",
                    "Mehul Prajapati",
                    "Rana Khalil",
                    "Ayush Pareek"
                ],
                "video_links": [],
                "description": "Published on March 12, 2017 - Public link - ICWSM 2016 (best paper)"
            },
            {
                "name": "‘Connected Learning’ and the Equity Agenda: A Microsociology of Minecraft  ",
                "doi": "10.1145/2818052.2874314",
                "pdf_links": [
                    {
                        "url": "http://morganya.org/research/ames-cscw17-minecraft.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Aditya Chatterjee",
                    "Shiven Mian",
                    "Ethan Chiu"
                ],
                "video": "https://youtu.be/j3fZ6UjCc34",
                "id": 222,
                "pdf": "http://morganya.org/research/ames-cscw17-minecraft.pdf",
                "audio": [
                    "Shiven Mian"
                ],
                "scripting": [
                    "Aditya Chatterjee",
                    "Shiven Mian",
                    "Ethan Chiu",
                    "Hasan Ahmad",
                    "Sajarin Dider",
                    "Ruchika Salwan",
                    "Annu Joshi",
                    "Cuong Nguyen"
                ],
                "video_links": [],
                "description": "Published on March 12, 2017 - Public link - CSCW 2017 (best paper)"
            },
            {
                "name": "Designing Movement-based Play With Young People Using Powered Wheelchairs",
                "doi": "10.1145/2858036.2858070",
                "video_links": [
                    {
                        "url": "https://youtu.be/De9DNBVQaMY",
                        "name": "Hindi",
                        "id": 245
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://eprints.lincoln.ac.uk/19919/1/Gerling%20et%20al.%20-%20Designing%20Movement-based%20Play%20With%20Young%20People%20Using%20Powered%20Wheelchairs.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Ayush Pareek",
                    "Shreyasvi Natraj"
                ],
                "video": "https://youtu.be/FDQtIe6aXa8",
                "id": 177,
                "pdf": "http://eprints.lincoln.ac.uk/19919/1/Gerling%20et%20al.%20-%20Designing%20Movement-based%20Play%20With%20Young%20People%20Using%20Powered%20Wheelchairs.pdf",
                "audio": [
                    "Naveena Benjamin"
                ],
                "scripting": [
                    "Ayush Pareek",
                    "Shreyasvi Natraj",
                    "Naveena Benjamin",
                    "Sai Gautham Thoppa",
                    "Abhinav Jangda",
                    "Briana Berger",
                    "Angela Pang"
                ],
                "description": "Published on March 12, 2017 - Public link - CHI 2016 (best paper)"
            },
            {
                "name": "Dueling network architectures for deep reinforcement learning",
                "doi": "",
                "video_links": [
                    {
                        "url": "https://youtu.be/MItCZ6GK2JM",
                        "name": "Spanish",
                        "id": 229
                    },
                    {
                        "url": "https://youtu.be/kyzpNhTVlIs",
                        "name": "Catalan",
                        "id": 231
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://arxiv.org/pdf/1511.06581.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Naveena Benjamin",
                    "Afelio Padilla",
                    "Tejas Sarma"
                ],
                "video": "https://youtu.be/qJd3yaEN9Sw",
                "id": 161,
                "pdf": "https://arxiv.org/pdf/1511.06581.pdf",
                "audio": [
                    "Naveena Benjamin"
                ],
                "scripting": [
                    "Naveena Benjamin",
                    "Afelio Padilla",
                    "Tejas Sarma",
                    "Niko Yasui",
                    "Aditya Sista",
                    "Gokul Krishnan Santhanam",
                    "Vinay Chandragiri",
                    "Ayush Pareek"
                ],
                "description": "Published on March 12, 2017 - Public link - ICML 2016 (best paper)"
            },
            {
                "name": "Pixel Recurrent Neural Networks",
                "doi": "10.23915/distill. 00003",
                "pdf_links": [
                    {
                        "url": "https://arxiv.org/pdf/1601.06759.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Rahul Ahuja",
                    "Kewal Shah",
                    "Swapneel Mehta"
                ],
                "video": "https://youtu.be/VzMFS1dcIDs",
                "id": 230,
                "pdf": "https://arxiv.org/pdf/1601.06759.pdf",
                "audio": [
                    "Vinay Chandragiri"
                ],
                "scripting": [
                    "Rahul Ahuja",
                    "Kewal Shah",
                    "Swapneel Mehta",
                    "Vinay Chandragiri",
                    "Tejaswi Kasarla",
                    "Zafarali Ahmed",
                    "Godfred Asamoah",
                    "Shiven Mian",
                    "Dhruv Ramani"
                ],
                "video_links": [],
                "description": "Published on March 12, 2017 - Public link - ICML 2016 (best paper)"
            },
            {
                "name": "Understanding Information Need: an fMRI Study",
                "doi": "10.1145/2911451.2911534",
                "pdf_links": [
                    {
                        "url": "http://eprints.gla.ac.uk/118374/1/118374.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Venkata Karthik Gullapalli",
                    "Siddharth Dungarwal",
                    "Yuh Chian Ong"
                ],
                "video": "https://youtu.be/yd55RMkYang",
                "id": 199,
                "pdf": "http://eprints.gla.ac.uk/118374/1/118374.pdf",
                "audio": [
                    "Sahil Dua"
                ],
                "scripting": [
                    "Venkata Karthik Gullapalli",
                    "Siddharth Dungarwal",
                    "Yuh Chian Ong",
                    "Prakash Pimpale",
                    "Sahil Dua",
                    "Shiven Mian",
                    "Naveena Benjamin"
                ],
                "video_links": [],
                "description": "Published on March 12, 2017 - Public link - SIGIR 2016 (best paper)"
            },
            {
                "name": "Real-Time 3D Reconstruction and 6-DoF Tracking with an Event Camera",
                "doi": "10.1007/978-3-319-46466-4_21",
                "pdf_links": [
                    {
                        "url": "https://www.doc.ic.ac.uk/~ajd/Publications/kim_etal_eccv2016.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Sourav Singh",
                    "Aseem Saxena",
                    "Prachi Manchanda"
                ],
                "video": "https://youtu.be/3S0cXB9Syls",
                "id": 233,
                "pdf": "https://www.doc.ic.ac.uk/~ajd/Publications/kim_etal_eccv2016.pdf",
                "audio": [
                    "Briana Berger"
                ],
                "scripting": [
                    "Sourav Singh",
                    "Aseem Saxena",
                    "Prachi Manchanda",
                    "Briana Berger",
                    "Shivam Sardana",
                    "Rameshwar Bhaskaran",
                    "Geetam Chawla"
                ],
                "video_links": [],
                "description": "Published on March 25, 2017 - Public link - ECCV 2016 (best paper)"
            },
            {
                "name": "ANYmal - A Highly Mobile and Dynamic Quadrupedal Robot",
                "doi": "10.1109/IROS.2016.7758092",
                "video_links": [
                    {
                        "url": "https://youtu.be/aAXZi6fWq7U",
                        "name": "Spanish",
                        "id": 272
                    },
                    {
                        "url": "https://youtu.be/KCxuvJaznXE",
                        "name": "French",
                        "id": 311
                    },
                    {
                        "url": "",
                        "name": "Hindi",
                        "id": 316
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://e-collection.library.ethz.ch/eserv/eth:49454/eth-49454-01.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Mukunda Madhava Nath",
                    "Shweta Singh",
                    "Ayush Sharma"
                ],
                "video": "https://youtu.be/dRpFMGq6DTE",
                "id": 262,
                "pdf": "http://e-collection.library.ethz.ch/eserv/eth:49454/eth-49454-01.pdf",
                "audio": [
                    "Sarnath Kannan",
                    "Roli Khanna",
                    "Elorm Buertey"
                ],
                "scripting": [
                    "Mukunda Madhava Nath",
                    "Shweta Singh",
                    "Ayush Sharma",
                    "Sarnath Kannan",
                    "Elorm Buertey",
                    "Vishal Gauba",
                    "Roli Khanna",
                    "Soumya Jindal",
                    "Oliver Atwal"
                ],
                "description": "Published on April 04, 2017 - Public link - IROS 2016 (best paper)"
            },
            {
                "name": "Bayesian Active Learning for Posterior Estimation",
                "doi": "",
                "video_links": [
                    {
                        "url": "https://youtu.be/-dbzI20Yavs",
                        "name": "Catalan",
                        "id": 305
                    },
                    {
                        "url": "https://youtu.be/CD1IFsPO_Jw",
                        "name": "Hindi",
                        "id": 315
                    },
                    {
                        "url": "https://youtu.be/BG5JRs-hKfo",
                        "name": "Spanish",
                        "id": 301
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://www.cs.cmu.edu/~kkandasa/pubs/kandasamyIJCAI15activePostEst.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Aseem Saxena",
                    "Sourav Singh"
                ],
                "video": "https://youtu.be/fxqBkVvkdB8",
                "id": 270,
                "pdf": "https://www.cs.cmu.edu/~kkandasa/pubs/kandasamyIJCAI15activePostEst.pdf",
                "audio": [
                    "Briana Berger"
                ],
                "scripting": [
                    "Aseem Saxena",
                    "Sourav Singh",
                    "Briana Berger",
                    "Ahmed Nasser",
                    "Tanveet Singh"
                ],
                "description": "Published on April 04, 2017 - Public link - IJCAI 2016 (best paper)"
            },
            {
                "name": "Understanding deep learning requires rethinking generalization",
                "doi": "10.1109/CVPR.2016.308",
                "video_links": [
                    {
                        "url": "https://youtu.be/vdB5CdCZXPw",
                        "name": "Nepali",
                        "id": 298
                    },
                    {
                        "url": "https://youtu.be/sEVAi8BX_xU",
                        "name": "Spanish",
                        "id": 271
                    },
                    {
                        "url": "https://youtu.be/4H2zAetUWlc",
                        "name": "Tamil",
                        "id": 302
                    },
                    {
                        "url": "https://youtu.be/qpoQGR6CxIU",
                        "name": "Marathi",
                        "id": 309
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://openreview.net/pdf?id=Sy8gdB9xx",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Srishti Sharma",
                    "Venkata Karthik Gullapalli",
                    "Shashi Gharti"
                ],
                "video": "https://youtu.be/s47Vl44WDQw",
                "id": 255,
                "pdf": "https://openreview.net/pdf?id=Sy8gdB9xx",
                "audio": [
                    "Srishti Sharma"
                ],
                "scripting": [
                    "Srishti Sharma",
                    "Venkata Karthik Gullapalli",
                    "Shashi Gharti",
                    "Sarnath Kannan",
                    "Vedhas Patkar"
                ],
                "description": "Published on April 04, 2017 - Public link - ICLR 2016 (best paper)"
            },
            {
                "name": "Ensuring Rapid Mixing and Low Bias for Asynchronous Gibbs Sampling",
                "doi": "",
                "video_links": [
                    {
                        "url": "https://youtu.be/wp61mchoukA",
                        "name": "Spanish",
                        "id": 304
                    },
                    {
                        "url": "",
                        "name": "Hindi",
                        "id": 283
                    }

                ],
                "pdf_links": [
                    {
                        "url": "https://arxiv.org/pdf/1602.07415.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Afelio Padilla",
                    "Anurag Singh",
                    "Luv Aggarwal"
                ],
                "video": "https://youtu.be/cfqOow-GelA",
                "id": 261,
                "pdf": "https://arxiv.org/pdf/1602.07415.pdf",
                "audio": [
                    "Luv Aggarwal"
                ],
                "scripting": [
                    "Padilla",
                    "Anurag Singh",
                    "Luv Aggarwal",
                    "Tejas Sarma"
                ],
                "description": "Published on April 04, 2017 - Public link - ICML 2016 (best paper)"
            },
            {
                "name": "Learning to Compose Neural Networks for Question Answering",
                "doi": "10.18653/v1/N16-1181",
                "video_links": [
                    {
                        "url": "https://youtu.be/xuj7eePpAks",
                        "name": "Spanish",
                        "id": 295
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www.aclweb.org/anthology/N16-1181",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Anshu Aviral",
                    "Suvarna Saumya",
                    "Mashrin Srivastava"
                ],
                "video": "https://youtu.be/PaBJDHVmMNY",
                "id": 267,
                "pdf": "http://www.aclweb.org/anthology/N16-1181",
                "audio": [
                    "Jerry Liu"
                ],
                "scripting": [
                    "Anshu Aviral",
                    "Suvarna Saumya",
                    "Mashrin Srivastava",
                    "Tushar Soni",
                    "Jerry Liu",
                    "Aman Achpal",
                    "Aditya Srivastava",
                    "Kewal Shah",
                    "Somyaa Aggarwal",
                    "Catherine Lee",
                    "Dhruv Ramani",
                    "Roli Khanna",
                    "Gargi Sharma"
                ],
                "description": "Published on April 04, 2017 - Public link - NAACl-HLT 2016 (best paper)"
            },
            {
                "name": "Efficient Algorithms for Public-Private Social Networks",
                "doi": "10.1145/2783258.2783354",
                "video_links": [
                    {
                        "url": "https://youtu.be/9SHnYYhHW-c",
                        "name": "Spanish",
                        "id": 278
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www.epasto.org/papers/kdd2015.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Rahul Ahuja",
                    "Aditya Gupta",
                    "Austin Gomez"
                ],
                "video": "https://youtu.be/o6GsHGtFuqk",
                "id": 260,
                "pdf": "http://www.epasto.org/papers/kdd2015.pdf",
                "audio": [
                    "Bhargav Yadavalli",
                    "Rahul Ahuja"
                ],
                "scripting": [
                    "Rahul Ahuja",
                    "Aditya Gupta",
                    "Austin Gomez",
                    "Siddharth Dungarwal",
                    "Annu Joshi",
                    "Patrick Wong",
                    "Priya Arora",
                    "Ruchika Salwan"
                ],
                "description": "Published on April 04, 2017 - Public link - KDD 2015 (best paper)"
            },
            {
                "name": "DeepEar: Robust Smartphone Audio Sensing in Unconstrained Acoustic Environments using Deep Learning",
                "doi": "10.1145/2750858.2804262",
                "video_links": [
                    {
                        "url": "https://youtu.be/6HTl336nmCM",
                        "name": "Spanish",
                        "id": 279
                    },
                    {
                        "url": "",
                        "name": "Mandarin",
                        "id": 310
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://niclane.org/pubs/ubicomp_deepear.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Shubham Jain",
                    "Aditya Narayan",
                    "Manav Bharambe",
                    "Myra Cheng"
                ],
                "video": "https://youtu.be/MdDyvBIWqGo",
                "id": 269,
                "pdf": "http://niclane.org/pubs/ubicomp_deepear.pdf",
                "audio": [
                    "Myra Cheng"
                ],
                "scripting": [
                    "Shubham Jain",
                    "Aditya Narayan",
                    "Manav Bharambe",
                    "Myra Cheng",
                    "Bhargav Yadavalli",
                    "Vineet Kumar",
                    "Amanda Chiu"
                ],
                "description": "Published on April 04, 2017 - Public link - UBICOMP 2015 (best paper)"
            },
            {
                "name": "Finding Email in a Multi-Account, Multi-Device World",
                "doi": "10.1145/2858036.2858473",
                "video_links": [
                    {
                        "url": "https://youtu.be/JR0uki26O6o",
                        "name": "Spanish",
                        "id": 280
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/06/chi16-2.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Aditya Chaterjee",
                    "Nilan Saha"
                ],
                "video": "https://youtu.be/CZS0U7rr0zU",
                "id": 259,
                "pdf": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/06/chi16-2.pdf",
                "audio": [
                    "Catherine Lee"
                ],
                "scripting": [
                    "Aditya Chaterjee",
                    "Nilan Saha",
                    "Catherine Lee",
                    "Keshav Kumar",
                    "Soumya Jindal",
                    "Anadita Bindra",
                    "Chloe C",
                    "Satheesh Kumar",
                    "Mangesh Joshi",
                    "Mesut Kescu",
                    "Sara Du",
                    "Sohel Mahmud",
                    "Umair Muhammad",
                    "Akshat Mishra",
                    "Mukunda Madhava Nath"
                ],
                "description": "Published on April 04, 2017 - Public link - CHI 2016 (best paper)"
            },
            {
                "name": "The Effect of Visual Appearance on the Performance of Continuous Sliders and Visual Analogue Scales",
                "doi": "10.1145/2858036.2858063",
                "video_links": [
                    {
                        "url": "https://youtu.be/GbyTWb5JdHE",
                        "name": "Spanish",
                        "id": 299
                    },
                    {
                        "url": "https://youtu.be/irPi4qlCPu8",
                        "name": "Chinese",
                        "id": 296
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www.dgp.toronto.edu/~tovi/papers/vas.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Grace Kang",
                    "Audrey Ho"
                ],
                "video": "https://youtu.be/iDI7BtUMcGg",
                "id": 266,
                "pdf": "http://www.dgp.toronto.edu/~tovi/papers/vas.pdf",
                "audio": [
                    "Ethan Nevidomsky"
                ],
                "scripting": [
                    "Grace Kang",
                    "Audrey Ho",
                    "Akshara Anand",
                    "Venkata Karthik Gullapalli",
                    "Divya Nagaraj",
                    "Mukunda Madhava Nath"
                ],
                "description": "Published on April 04, 2017 - Public link - CHI 2016 (best paper)"
            },
            {
                "name": "Zooids: Building Blocks for Swarm User Interfaces",
                "doi": "10.1145/2984511.2984547",
                "video_links": [
                    {
                        "url": "https://youtu.be/qwlbkLEDk50",
                        "name": "Spanish",
                        "id": 303
                    },
                    {
                        "url": "",
                        "name": "Odia",
                        "id": 294
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://hal.inria.fr/hal-01391281/document",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Harsh Vardhan",
                    "Punit Vara",
                    "Katie Mishra"
                ],
                "video": "https://youtu.be/vqSuQkhKP0A",
                "id": 264,
                "pdf": "https://hal.inria.fr/hal-01391281/document",
                "audio": [
                    "Katie Mishra"
                ],
                "scripting": [
                    "Harsh Vardhan",
                    "Punit Vara",
                    "Katie Mishra",
                    "Suvendu Kumar Dash"
                ],
                "description": "Published on April 04, 2017 - Public link - UIST 2016 (best paper)"
            },
            {
                "name": "VizWiz: nearly real-time answers to visual questions",
                "doi": "10.1145/1866029.1866080",
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=1866029.1866080",
                        "name": "ACM"
                    },
                    {
                        "url": "https://groups.csail.mit.edu/uid/other-pubs/vizwiz.pdf",
                        "name": "PDF"
                    }
                ],
                "dri": [
                    "Afelio Padilla",
                    "Ashrith Sheshan",
                    "Dilrukshi Gamage",
                    "Tejas Sarma"
                ],
                "video": "https://youtu.be/solWTf_KDXI",
                "id": 137,
                "pdf": "https://groups.csail.mit.edu/uid/other-pubs/vizwiz.pdf",
                "audio": [
                    "Akshat Mishra",
                    "Lenny Khazan",
                    "Rohan Kapur"
                ],
                "scripting": [],
                "video_links": [],
                "description": "Jeffrey P. Bigham, at. al. 2010. VizWiz: nearly real-time answers to visual questions. In Proceedings of the 23nd annual ACM symposium on User interface software and technology (UIST '10)."
            },
            {
                "name": "A Convex Polynomial Force-Motion Model for Planar Sliding: Identification and Application",
                "description": "Jiaji Zhou and Robert Paolini and J. Andrew Bagnell and Matthew T. Mason: A convex polynomial force-motion model for planar sliding: Identification and application, 2016 IEEE International Conference on Robotics and Automation (ICRA), year=2016, pages=372-377",
                "doi": "10.1109/ICRA.2016.7487155",
                "published_on": "June 9, 2016",
                "pdf_links": [
                    {
                        "name": "IEEE",
                        "url": "http://ieeexplore.ieee.org/document/7487155/"
                    },
                    {
                        "name": "PDF",
                        "url": "https://arxiv.org/pdf/1602.06056.pdf"
                    }
                ],
                "dri": [
                    "Aseem Saxena",
                    "Ayush Pareek"
                ],
                "scripting": [
                    "Aditya Chatterjee",
                    "Aseem Saxena",
                    "Ayush Pareek"
                ],
                "super_dri": [
                    "Afelio Padilla",
                    "Ashrith Seshan"
                ],
                "pdf": "https://arxiv.org/pdf/1602.06056.pdf",
                "video": "https://youtu.be/EnF0xe0ijHA",
                "id": 335,
                "video_links": [
                    {
                        "name": "Spanish",
                        "url": "https://stanfordscholar.org/media/343/videos/video.mp4",
                        "id": 343
                    },
                    {
                        "name": "Catalan",
                        "url": "https://stanfordscholar.org/media/344/videos/video.mp4",
                        "id": 344
                    },
                    {
                        "name": "French",
                        "url": "https://stanfordscholar.org/media/347/videos/video.mp4",
                        "id": 347
                    }
                ]
            },
            {
                "name": "Deep Face Deblurring",
                "doi": "",
                "description": "Grigorios G. Chrysos, Stefanos Zafeiriou, Deep Face Deblurring",
                "published_on": "25 May 2017",
                "pdf_links": [
                    {
                        "name": "PDF",
                        "url": "https://arxiv.org/pdf/1704.08772v1.pdf"
                    }
                ],
                "dri": [
                    "Myra Cheng",
                    "Shashi Garthi",
                    "Venkata Karthik Gullapali"
                ],
                "scripting": [
                    "Myra Cheng",
                    "Shashi Garthi",
                    "Venkata Karthik Gullapali",
                    "Prakhar Srivastava"
                ],
                "audio": [
                    "Myra Cheng"
                ],
                "super_dri": [
                    "Afelio Padilla",
                    "Ashrith Seshan"
                ],
                "pdf": "https://arxiv.org/pdf/1602.06056.pdf",
                "video": "https://youtu.be/LDxFir0nnZc",
                "id": 337,
                "video_links": [
                    {
                        "name": "Spanish",
                        "url": "https://stanfordscholar.org/media/345/videos/video.mp4",
                        "id": 345
                    }
                ]
            },
            {
                "name": "Recursive decomposition for nonconvex optimization",
                "description": "Abram L. Friesen, Pedro Domingos, Recursive decomposition for nonconvex optimization, 24th International Joint Conference on Artificial Intelligence, IJCAI 2015 - Buenos Aires, Argentina, pp. 253-259",
                "doi": "10.1109/ICRA.2016.7487155",
                "published_on": "January, 2015",
                "pdf_links": [
                    {
                        "name": "SCOPUS",
                        "url": "https://www.scopus.com/record/display.uri?eid=2-s2.0-84949772686&origin=inward&txGid=7F7BD756CBF30FC16A1611420A12CC8A.wsnAw8kcdt7IPYLO0V48gA%3a2"
                    },
                    {
                        "name": "PDF",
                        "url": "https://homes.cs.washington.edu/~pedrod/papers/ijcai15.pdf"
                    }
                ],
                "dri": [
                    "Aditya Narayan",
                    "John Kongtcheu"
                ],
                "scripting": [
                    "Aditya Narayan",
                    "Ayush Pareek",
                    "John Kongtcheu",
                    "Prakhar Srivastava",
                    "Srijith Nair"
                ],
                "audio": [
                    "Karina Halevy"
                ],
                "super_dri": [
                    "Afelio Padilla",
                    "Ashrith Seshan"
                ],
                "pdf": "https://homes.cs.washington.edu/~pedrod/papers/ijcai15.pdf",
                "video": "https://youtu.be/UVoVoOgt1U0",
                "id": 338,
                "video_links": [
                    {
                        "url": "",
                        "name": "Spanish",
                        "id": 342
                    }
                ]
            },
            {
                "name": "Naturalizing a Programming Language via Interactive Learning",
                "doi": "",
                "description": "Sida I. Wang, Samuel Ginn, Percy Liang, Christopher D. Manning, Naturalizing a Programming Language via Interactive Learning, Association for Computational Linguistics (ACL), 2017",
                "published_on": "April 23, 2017",
                "pdf_links": [
                    {
                        "name": "PDF",
                        "url": "https://arxiv.org/pdf/1704.06956.pdf"
                    }
                ],
                "dri": [
                    "Nishant Kumar",
                    "Prakhar Srivastava"
                ],
                "scripting": [
                    "Ayush Pareek",
                    " Karina Halevy",
                    "Nishant Kumar",
                    "Prakhar Srivastava",
                    "Rounak Banik",
                    "Swapneel Mehta"
                ],
                "audio": [
                    "Karina Halevy"
                ],
                "super_dri": [
                    "Afelio Padilla",
                    "Ashrith Seshan"
                ],
                "pdf": "https://arxiv.org/pdf/1704.06956.pdf",
                "video": "https://youtu.be/c8XwXrt8cLM",
                "id": 334,
                "video_links": [
                    {
                        "url": "",
                        "name": "Mandarin",
                        "id": 346
                    }
                ]
            },
            {
                "name": "Optimal and Adaptive Algorithms for Online Boosting",
                "doi": "",
                "description": "Alina Beygelzimer, Satyen Kale and Haipeng Luo, Optimal and Adaptive Algorithms for Online Boosting, Proceedings of the Twenty-Fifth International Joint Conference on Artificial Intelligence (IJCAI-16), Best Paper Award winner",
                "published_on": "February, 2015",
                "pdf_links": [
                    {
                        "name": "IJCAI",
                        "url": "https://www.ijcai.org/Proceedings/16/Papers/614.pdf"
                    },
                    {
                        "name": "PDF",
                        "url": "https://arxiv.org/pdf/1502.02651.pdf"
                    }
                ],
                "dri": [
                    "Afelio Padilla",
                    "Ayush Pareek"
                ],
                "scripting": [
                    "Afelio Padilla",
                    "Ayush Pareek",
                    "Anshaj Goel",
                    "Sourav Singh",
                    "Swapneel Mehta"
                ],
                "audio": [
                    "Karina Halevy"
                ],
                "super_dri": [
                    "Afelio Padilla",
                    "Ashrith Seshan"
                ],
                "pdf": "https://arxiv.org/pdf/1602.06056.pdf",
                "video": "https://youtu.be/CIuAmpEY080",
                "id": 331,
                "video_links": []
            },
            {
                "name": "ColourID: Improving Colour for People with Impaired Colour Vision Identification",
                "description": "David R. Flatla, Alan R. Andrade, Ross D. Teviotdale, Dylan L. Knowles and Craig Stewart, ColourID: Improving Colour for People with Impaired Colour VisionIdentification, CHI'15 Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems pp. 3543-3552",
                "doi": "10.1145/2702123.2702578",
                "published_on": "April, 2015",
                "pdf_links": [
                    {
                        "name": "ACM",
                        "url": "http://delivery.acm.org/10.1145/2710000/2702578/p3543-flatla.pdf?ip=88.24.38.2&id=2702578&acc=OA&key=4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E2D9C70E33D197B09&CFID=771829000&CFTOKEN=80512108&__acm__=1496908159_7a3d32019be69c06a97aec1d4d94e6dd"
                    }
                ],
                "dri": [
                    "Ayush Pareek",
                    "Niresh Jain"
                ],
                "scripting": [
                    "Aditya Chatterjee",
                    "Ayush Pareek",
                    "Niresh Jain",
                    "Shanmugam Losini",
                    "Soham Pahuja"
                ],
                "audio": [],
                "super_dri": [
                    "Afelio Padilla",
                    "Ashrith Seshan"
                ],
                "pdf": "http://delivery.acm.org/10.1145/2710000/2702578/p3543-flatla.pdf?ip=88.24.38.2&id=2702578&acc=OA&key=4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35%2E2D9C70E33D197B09&CFID=771829000&CFTOKEN=80512108&__acm__=1496909563_458aabd97a7556cd3936d2b699293aea",
                "video": "https://youtu.be/OtYZdvGE8Go",
                "id": 336,
                "video_links": [
                    {
                        "url": "",
                        "name": "Arabic",
                        "id": 350
                    },
                    {
                        "url": "",
                        "name": "Mandarin",
                        "id": 355
                    }
                ]
            },
            {
                "name": "ViBand: High-Fidelity Bio-Acoustic Sensing Using Commodity Smartwatch Accelerometers",
                "description": "Gierad Laput Robert Xiao Chris Harrison, ViBand: High-Fidelity Bio-Acoustic Sensing Using Commodity Smartwatch Accelerometers, UIST'16 Proceedings of the 29th Annual Symposium on User Interface Software and Technology pp. 321-333",
                "doi": "10.1145/2984511.2984582",
                "published_on": "October, 2016",
                "pdf_links": [
                    {
                        "name": "ACM",
                        "url": "http://dl.acm.org/citation.cfm?id=2984582&picked=formats&CFID=771829000&CFTOKEN=80512108"
                    },
                    {
                        "name": "PDF",
                        "url": "http://www.gierad.com/assets/viband/viband.pdf"
                    }
                ],
                "dri": [
                    "Ayush Pareek",
                    "Tzu Kit Chan"
                ],
                "scripting": [
                    "Ayush Pareek",
                    "Jerry Liu",
                    "Prakhar Srivastava",
                    "Reynaldo Gil",
                    "Siddharth Dungarwal",
                    "Tzu Kit Chan"
                ],
                "audio": [
                    "Karina Halevy"
                ],
                "super_dri": [
                    "Afelio Padilla",
                    "Ashrith Seshan"
                ],
                "pdf": "http://www.gierad.com/assets/viband/viband.pdf",
                "video": "https://youtu.be/EtykC1uZnTM",
                "id": 333,
                "video_links": []
            },
            {
                "name": "NormalTouch and TextureTouch: High-fidelity 3D Haptic Shape Rendering on Handheld Virtual Reality Controllers",
                "description": "Hrvoje Benko, Christian Holz, Mike Sinclair, Eyal Ofek, NormalTouch and TextureTouch: High-fidelity 3D Haptic Shape Rendering on Handheld Virtual Reality Controllers, UIST'16 Proceedings of the 29th Annual Symposium on User Interface Software and Technology, Pages 717-728",
                "doi": "10.1145/2984511.2984526",
                "published_on": "October, 2016",
                "pdf_links": [
                    {
                        "name": "ACM",
                        "url": "http://dl.acm.org/citation.cfm?id=2984526&picked=formats&CFID=771829000&CFTOKEN=80512108"
                    },
                    {
                        "name": "PDF",
                        "url": "http://www.christianholz.net/2016-uist16-benko_holz_sinclair_ofek-NormalTouch_and_TextureTouch-High-fidelity_3D_Haptic_Shape_Rendering_on_Handheld_Virtual_Reality_Controllers.pdf"
                    }
                ],
                "dri": [
                    "Ayush Pareek"
                ],
                "scripting": [
                    "Audrey Ho",
                    "Ayush Pareek",
                    "Chloe C",
                    "Katie Mishra",
                    "Jerry Liu",
                    "Pranu Sarna",
                    "Punit Vara",
                    "Siddharth Dungarwal"
                ],
                "audio": [],
                "super_dri": [
                    "Afelio Padilla",
                    "Ashrith Seshan"
                ],
                "pdf": "http://www.christianholz.net/2016-uist16-benko_holz_sinclair_ofek-NormalTouch_and_TextureTouch-High-fidelity_3D_Haptic_Shape_Rendering_on_Handheld_Virtual_Reality_Controllers.pdf",
                "video": "https://youtu.be/Tr_54Zp0Tps",
                "id": 332,
                "video_links": []
            },
            {
                "name": "The Social Impact of a Robot Co-Worker in Industrial Settings",
                "description": "Allison Sauppe and Bilge Mutlu,The Social Impact of a Robot Co-Worker in Industrial Settings, CHI'15 Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems, pp. 3613-3622 ",
                "doi": "10.1109/ICRA.2016.7487155",
                "published_on": "April, 2015",
                "pdf_links": [
                    {
                        "name": "ACM",
                        "url": "http://dl.acm.org/citation.cfm?id=2702181&picked=formats&CFID=771829000&CFTOKEN=80512108"
                    }
                ],
                "dri": [
                    "Aditya Chatterjee",
                    "Grace Kang",
                    "Nirakar Sapkota"
                ],
                "scripting": [
                    "Aditya Chatterjee",
                    "Anandita Bindra",
                    "Grace Kang",
                    "Harsh Vardhan",
                    "Nirakar Sapkota",
                    "Oliver Atwal",
                    "Persaud Surendra"
                ],
                "audio": [
                    "Nirakar Sapkota"
                ],
                "super_dri": [
                    "Afelio Padilla",
                    "Ashrith Seshan"
                ],
                "pdf": "https://arxiv.org/pdf/1602.06056.pdf",
                "image": "",
                "video": "https://youtu.be/G5ZCf_mxUG0",
                "id": 327,
                "video_links": [
                    {
                        "url": "https://stanfordscholar.org/media/348/videos/video.mp4",
                        "name": "Chinese",
                        "id": 349
                    }
                ]
            },
            {
                "name": "Generating Dynamic Feasible Trajectories for Quadrotor cameras",
                "description": "M Roberts, P Hanrahan, ACM Transactions on Graphics (TOG) 35 (4), 61",
                "doi": "10.1145/2897824.2925980",
                "published_on": "July, 2016",
                "pdf_links": [
                    {
                        "name": "ACM",
                        "url": "http://dl.acm.org/citation.cfm?id=2925980"
                    },
                    {
                        "name": "PDF",
                        "url": "http://graphics.stanford.edu/papers/feasible_trajectories/data/siggraph_2016_paper.pdf"
                    }
                ],
                "dri": [
                    "Ayush Pareek"
                ],
                "scripting": [
                    "Ayush Pareek"
                ],
                "audio": [],
                "super_dri": [
                    "Afelio Padilla",
                    "Ashrith Seshan"
                ],
                "pdf": "http://graphics.stanford.edu/papers/feasible_trajectories/data/siggraph_2016_paper.pdf",
                "image": "",
                "video": "",
                "id": 108,
                "video_links": []
            }
        ];

        vm.papers = lodash.map(vm.papers, function (paper) {
            paper.image = 'https://i.ytimg.com/vi/' + paper.yid + '/maxresdefault.jpg';
            return paper;
        });

        // vm.paper = lodash.find(vm.papers, function (paper) {
        //     return paper.id === parseInt($stateParams.id);
        // });
        //
        Course.get($stateParams.id).then(function (response, status) {
            vm.paper = response.data;
            vm.paper.image = 'https://i.ytimg.com/vi/' + vm.paper.yid + '/maxresdefault.jpg';
            vm.paper.video = 'https://youtu.be/' + vm.paper.yid + '/';
        });

        Course.listRelated($stateParams.id).then(function (response, status) {
            vm.related = lodash.map(response.data, function (paper) {
                paper.image = 'https://i.ytimg.com/vi/' + paper.yid + '/maxresdefault.jpg';
                return paper;
            });

        });

        vm.discusConfig = {
            disqus_shortname: 'stanfordscholar',
            disqus_identifier: $stateParams.id,
            disqus_url: '#page/talk/' + $stateParams.id
        };

        // vm.featured_papers = vm.papers.slice(0, 3);

        function has_error(field_name) {
            var field = $scope.form[field_name];
            return (field.$touched || vm.submitted) && field.$invalid;
        }


    }

})();
