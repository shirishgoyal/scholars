(function () {
    'use strict';

    angular.module('BlurAdmin.pages.page')
        .controller('PageCtrl', PageCtrl);

    /** @ngInject */
    function PageCtrl($scope, $state, $log, Auth, lodash) {
        var vm = this;

        vm.account = {};
        vm.isAuthenticated = Auth.isAuthenticated();
        vm.submitted = false;
        vm.errors = {};

        vm.has_error = has_error;

        vm.papers = [
            {
                "name": "Mastering the Game of Go with Deep Neural Networks and Tree Search",
                "doi": "doi:10.1038/nature16961",
                "video_links": [
                    {
                        "url": "https://youtu.be/MXVyITzDzu0",
                        "name": "Hindi"
                    },
                    {
                        "url": "https://youtu.be/q4hcXtUxUxA",
                        "name": "Catalan"
                    },
                    {
                        "url": "https://youtu.be/s6S55XSRVFM",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www.nature.com/nature/journal/v529/n7587/full/nature16961.html",
                        "name": "Nature"
                    },
                    {
                        "url": "http://airesearch.com/wp-content/uploads/2016/01/deepmind-mastering-go.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Anshu Aviral",
                    "Venkata Karthik Gullapalli"
                ],
                "video": "https://www.youtube.com/embed/F2uBxrnfgVA",
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
                        "name": "Catalan"
                    },
                    {
                        "url": "https://youtu.be/gBugb6SAMaI",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://papers.nips.cc/paper/6461-learning-to-learn-by-gradient-descent-by-gradient-descent.pdf",
                        "name": "NIPS"
                    },
                    {
                        "url": "https://papers.nips.cc/paper/6461-learning-to-learn-by-gradient-descent-by-gradient-descent.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Afelio Padilla"
                ],
                "video": "https://www.youtube.com/embed/yxGyNv0Kjcs",
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
                        "name": "Catalan"
                    },
                    {
                        "url": "https://youtu.be/gtqqzFk4e6E",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2883077",
                        "name": "ACM"
                    },
                    {
                        "url": "https://cs.stanford.edu/people/jure/pubs/growing-www16.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Giri Bhatnagar",
                    "Sourav Singh"
                ],
                "video": "https://www.youtube.com/embed/xnn5_ObBk2o",
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
                        "name": "Hindi"
                    },
                    {
                        "url": "https://youtu.be/Gs581Q6BHII",
                        "name": "Malayalam"
                    },
                    {
                        "url": "https://youtu.be/Wg5FQ55UJYs",
                        "name": "Spanish"
                    },
                    {
                        "url": "https://youtu.be/p3KxwVHdJ2Y",
                        "name": "Catalan"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2741080",
                        "name": "ACM"
                    },
                    {
                        "url": "http://www.www2015.it/documents/proceedings/proceedings/p1003.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Afelio Padilla",
                    "Anshu Aviral"
                ],
                "video": "https://www.youtube.com/embed/Aj9Q6R6pVII",
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
                        "name": "Spanish"
                    },
                    {
                        "url": "https://youtu.be/7qW5h8Wd9BE",
                        "name": "Catalan"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2741691",
                        "name": "ACM"
                    },
                    {
                        "url": "http://research.google.com/pubs/pub43783.html",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Venkata Karthik Gullapalli",
                    "Gagana B"
                ],
                "video": "https://www.youtube.com/embed/h8YwQvJm7rk",
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
                        "name": "Catalan"
                    },
                    {
                        "url": "https://youtu.be/-vDR939Wiuk",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2883035",
                        "name": "ACM"
                    },
                    {
                        "url": "http://homes.cs.washington.edu/~nasmith/papers/wilson+etal.www16.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Ayush Shah",
                    "Tejas Sarma"
                ],
                "video": "https://www.youtube.com/embed/h7Ye23GC77M",
                "pdf": "http://homes.cs.washington.edu/~nasmith/papers/wilson+etal.www16.pdf",
                "audio": [
                    "Ayush Shah"
                ],
                "scripting": [],
                "description": "Shomir Wilson, at. al. 2016. Crowdsourcing Annotations of Websites’ Privacy Policies: Can It Really Work?. In Proceedings of the 25th International Conference on World Wide Web (WWW 2016)."
            },
            {
                "name": "Social Networks Under Stress",
                "doi": "10.1016/j.ssresearch.2014.01.001",
                "video_links": [
                    {
                        "url": "https://youtu.be/LUJb26_LSW0",
                        "name": "Catalan"
                    },
                    {
                        "url": "https://youtu.be/ARH5a1PUzwE",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2883063",
                        "name": "ACM"
                    },
                    {
                        "url": "https://arxiv.org/pdf/1602.00572.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Giulia Paris",
                    "Rohan Kapur",
                    "Debarati Das"
                ],
                "video": "https://www.youtube.com/embed/FIX2uls7fX8",
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
                        "name": "Hindi"
                    },
                    {
                        "url": "https://youtu.be/x_jy7G3Jp8s",
                        "name": "Catalan"
                    },
                    {
                        "url": "https://youtu.be/pAvdSxXV_jE",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2883041",
                        "name": "ACM"
                    },
                    {
                        "url": "https://arxiv.org/pdf/1602.00370v2.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Afelio Padilla",
                    "Anshu Aviral"
                ],
                "video": "https://www.youtube.com/embed/XRnPTBBQPAQ",
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
                        "name": "Catalan"
                    },
                    {
                        "url": "https://youtu.be/9WlafrV_wQo",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2883070",
                        "name": "ACM"
                    },
                    {
                        "url": "http://www2016.net/proceedings/proceedings/p843.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Venkata Karthik Gullapalli",
                    "Gargi Sharma"
                ],
                "video": "https://www.youtube.com/embed/pQPH454oL9o",
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
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://dl.acm.org/citation.cfm?id=2915235",
                        "name": "ACM"
                    },
                    {
                        "url": "https://www.cse.ust.hk/~yike/sigmod16.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Freddie Vargus",
                    "Anshu Aviral"
                ],
                "video": "https://www.youtube.com/embed/0x0a4BDkEKQ",
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
                "video_links": [
                    {
                        "url": "https://youtu.be/26MK9Vq4mKM",
                        "name": "Hindi"
                    },
                    {
                        "url": "https://youtu.be/3xD5-Z97rCI",
                        "name": "Chinese"
                    },
                    {
                        "url": "https://youtu.be/xse3CmhJhOo",
                        "name": "Spanish"
                    },
                    {
                        "url": "https://youtu.be/DtAaf1V76Jc",
                        "name": "Catalan"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www.ijcai.org/Proceedings/16/Papers/458.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Binit Kumar"
                ],
                "video": "https://www.youtube.com/embed/2lDzMuBWuqA",
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
                        "name": "Hindi"
                    },
                    {
                        "url": "https://youtu.be/zwOeY8t_FXg",
                        "name": "Spanish"
                    },
                    {
                        "url": "https://youtu.be/qZMr91xz7hQ",
                        "name": "Catalan"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www.cv-foundation.org/openaccess/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Tejas Sarma",
                    "Ayush Singh"
                ],
                "video": "https://www.youtube.com/embed/hwMsKmgopSU",
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
                        "url": "https://www.youtube.com/watch?v=FslD8MhPOSk",
                        "name": "Malayalam"
                    },
                    {
                        "url": "https://youtu.be/QUVrrK5VF3Y",
                        "name": "Spanish"
                    },
                    {
                        "url": "https://youtu.be/Kolw3v7uIbo",
                        "name": "Spanish"
                    },
                    {
                        "url": "https://youtu.be/LmsbBiqiMvA",
                        "name": "Catalan"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www.kdd.org/kdd2016/papers/files/rfp0110-hooiA.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Afelio Padilla",
                    "Naveena Benjamin",
                    "Swapneel Mehta",
                    "Raviteja Chunduru"
                ],
                "video": "https://www.youtube.com/embed/B8dJgC4MkPY",
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
                    "Sukanya Mandal",

                ],
                "description": "Published on Jan 08, 2017 - Public link - KDD 2016 (best paper)"
            },
            {
                "name": "Beyond Ranking: Optimizing Whole-Page Presentation",
                "doi": "10.1145/2835776.2835824",
                "video_links": [
                    {
                        "url": "https://youtu.be/155xtv-LpoU",
                        "name": "Spanish"
                    },
                    {
                        "url": "https://youtu.be/KU34w_YE-Po",
                        "name": "Catalan"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www-personal.umich.edu/~raywang/pub/wsdm402-wang.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Ayush Pareek",
                    "Venkata Karthik Gullapalli",
                    "Shivank Awasthi"
                ],
                "video": "https://www.youtube.com/embed/1LGJmFadtoI",
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
                    "Juhi Parekh",

                ],
                "description": "Published on Jan 08, 2017 - Public link - WSDM 2016 (best paper)"
            },
            {
                "name": "Haptic Wave: A Cross-Modal Interface for Visually Impaired Audio Producers",
                "doi": "10.1145/2858036.2858304",
                "video_links": [
                    {
                        "url": "https://youtu.be/unCNVFu2Yro",
                        "name": "Chinese"
                    },
                    {
                        "url": "https://youtu.be/F4Lz1Q73k58",
                        "name": "Spanish"
                    },
                    {
                        "url": "https://youtu.be/HwcBmAt9luE",
                        "name": "Japanese"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://research.gold.ac.uk/17513/1/paper1345.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Niresh Jain",
                    "Akshat Mishra"
                ],
                "video": "https://www.youtube.com/embed/-yiF3LpjiV4",
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
                    "Kewal Shah",

                ],
                "description": "Published on Jan 08, 2017 - Public link - CHI 2016 (best paper)"
            },
            {
                "name": "Community-based Data Validation Practices in Citizen Science",
                "doi": "10.1145/2818048.2820063",
                "pdf_links": [
                    {
                        "url": "http://openknowledge.umd.edu/wp-content/uploads/2015/11/proceedings.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Florin Cioloboc"
                ],
                "video": "https://www.youtube.com/embed/csRe-swO_1U",
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
                    "Yogesh Kulkarni",

                ],
                "description": "Published on Jan 08, 2017 - Public link - CSCW 2016 (best paper)"
            },
            {
                "name": "Tightly CCA-Secure Encryption Without Pairings",
                "doi": "10.1007/978-3-662-49890-3_1",
                "pdf_links": [
                    {
                        "url": "https://eprint.iacr.org/2016/094.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Sarthak Munshi"
                ],
                "video": "https://www.youtube.com/embed/8gZSfT4y44w",
                "pdf": "https://eprint.iacr.org/2016/094.pdf",
                "audio": [
                    "Sarthak Munshi",
                    "Nishant Kumar"
                ],
                "scripting": [
                    "Sarthak Munshi",
                    "Nishant Kumar",
                    "Ayush Pareek",

                ],
                "description": "Published on Jan 08, 2017 - Public link - EuroCrypt 2016 (best paper)"
            },
            {
                "name": "Asserting Reliable Convergence for Configuration Management Scripts",
                "doi": "10.1145/2983990.2984000",
                "video_links": [
                    {
                        "url": "https://youtu.be/texL9SOErps",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://hummer.io/docs/2016-citac-oopsla.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Srishti Sharma"
                ],
                "video": "https://www.youtube.com/embed/lRnktUidx64",
                "pdf": "http://hummer.io/docs/2016-citac-oopsla.pdf",
                "audio": [
                    "Ayush Pareek",
                    "Siddharth Dungarwal"
                ],
                "scripting": [
                    "Srishti Sharma",
                    "Ayush Pareek",
                    "Siddharth Dungarwal",
                    "Ankit Aggarwal",

                ],
                "description": "Published on Jan 08, 2017 - Public link - OOPSLA 2016 (best paper)"
            },
            {
                "name": "Bidirectional Search That Is Guaranteed to Meet in the Middle",
                "doi": "10.1145/2757001.2757009",
                "video_links": [
                    {
                        "url": "https://youtu.be/-3m-UQsQi6M",
                        "name": "Spanish"
                    },
                    {
                        "url": "https://youtu.be/8bypmOpbHaw",
                        "name": "Catalan"
                    },
                    {
                        "url": "https://youtu.be/YW5cKSjNX_Y",
                        "name": "Hindi"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://webdocs.cs.ualberta.ca/~holte/Publications/MM-AAAI2016.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Suvarna Saumya",
                    "Anshu Aviral",
                    "Gargi Sharma"
                ],
                "video": "https://www.youtube.com/embed/YIdF9CT7Mzo",
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
                        "name": "Hindi"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://www.aaai.org/ocs/index.php/AAAI/AAAI15/paper/viewFile/9983/9762",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Shweta Singh",
                    "Ayush Sharma",
                    "Vineet Kumar"
                ],
                "video": "https://www.youtube.com/embed/Yetdd95wPAk",
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
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Nishant Kumar",
                    "T K Sourabh",
                    "Nehul Yadav"
                ],
                "video": "https://www.youtube.com/embed/J5g2DhIjHDw",
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
                "description": "Published on March 12, 2017 - Public link - VLDB 2016 (best paper)"
            },
            {
                "name": "Rovables: Miniature On-Body Robots as Wearables",
                "doi": "10.1145/2984511.2984531",
                "video_links": [
                    {
                        "url": "https://youtu.be/to4iuhIFxEA",
                        "name": "Hindi"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://shape.stanford.edu/research/rovables/Rovables_UIST_2016.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Hardik Surana",
                    "Rashmi Nagpal",
                    "Mukunda Madhava Nath"
                ],
                "video": "https://www.youtube.com/embed/YaZupoNoOtE",
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
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Debarati Das",
                    "Srishti Sharma",
                    "Umair Muhammad"
                ],
                "video": "https://www.youtube.com/embed/K7LN3MSovG0",
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
                "description": "Published on March 12, 2017 - Public link - ICWSM 2016 (best paper)"
            },
            {
                "name": "‘Connected Learning’ and the Equity Agenda: A Microsociology of Minecraft  ",
                "doi": "10.1145/2818052.2874314",
                "pdf_links": [
                    {
                        "url": "http://morganya.org/research/ames-cscw17-minecraft.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Aditya Chatterjee",
                    "Shiven Mian",
                    "Ethan Chiu"
                ],
                "video": "https://www.youtube.com/embed/j3fZ6UjCc34",
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
                "description": "Published on March 12, 2017 - Public link - CSCW 2017 (best paper)"
            },
            {
                "name": "Designing movement-based play with young people using powered wheelchairs",
                "doi": "10.1145/2858036.2858070",
                "video_links": [
                    {
                        "url": "https://youtu.be/De9DNBVQaMY",
                        "name": "Hindi"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://eprints.lincoln.ac.uk/19919/1/Gerling%20et%20al.%20-%20Designing%20Movement-based%20Play%20With%20Young%20People%20Using%20Powered%20Wheelchairs.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Ayush Pareek",
                    "Shreyasvi Natraj"
                ],
                "video": "https://www.youtube.com/embed/FDQtIe6aXa8",
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
                        "name": "Spanish"
                    },
                    {
                        "url": "https://youtu.be/kyzpNhTVlIs",
                        "name": "Catalan"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://arxiv.org/pdf/1511.06581.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Naveena Benjamin",
                    "Afelio Padilla",
                    "Tejas Sarma"
                ],
                "video": "https://www.youtube.com/embed/qJd3yaEN9Sw",
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
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Rahul Ahuja",
                    "Kewal Shah",
                    "Swapneel Mehta"
                ],
                "video": "https://www.youtube.com/embed/VzMFS1dcIDs",
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
                "description": "Published on March 12, 2017 - Public link - ICML 2016 (best paper)"
            },
            {
                "name": "Understanding Information Need: an fMRI Study",
                "doi": "10.1145/2911451.2911534",
                "pdf_links": [
                    {
                        "url": "http://eprints.gla.ac.uk/118374/1/118374.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Venkata Karthik Gullapalli",
                    "Siddharth Dungarwal",
                    "Yuh Chian Ong"
                ],
                "video": "https://www.youtube.com/embed/yd55RMkYang",
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
                "description": "Published on March 12, 2017 - Public link - SIGIR 2016 (best paper)"
            },
            {
                "name": "Real-Time 3D Reconstruction and 6-DoF Tracking with an Event Camera",
                "doi": "10.1007/978-3-319-46466-4_21",
                "pdf_links": [
                    {
                        "url": "https://www.doc.ic.ac.uk/~ajd/Publications/kim_etal_eccv2016.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Sourav Singh",
                    "Aseem Saxena",
                    "Prachi Manchanda"
                ],
                "video": "https://www.youtube.com/embed/3S0cXB9Syls",
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
                    "Geetam Chawla",

                ],
                "description": "Published on March 25, 2017 - Public link - ECCV 2016 (best paper)"
            },
            {
                "name": "ANYmal - A Highly Mobile and Dynamic Quadrupedal Robot",
                "doi": "10.1109/IROS.2016.7758092",
                "video_links": [
                    {
                        "url": "https://www.youtube.com/watch?v=aAXZi6fWq7U",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://e-collection.library.ethz.ch/eserv/eth:49454/eth-49454-01.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Mukunda Madhava Nath",
                    "Shweta Singh",
                    "Ayush Sharma"
                ],
                "video": "https://www.youtube.com/embed/dRpFMGq6DTE",
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
                    "Oliver Atwal",

                ],
                "description": "Published on April 04, 2017 - Public link - IROS 2016 (best paper)"
            },
            {
                "name": "Bayesian Active Learning for Posterior Estimation",
                "doi": "",
                "video_links": [
                    {
                        "url": "https://www.youtube.com/watch?v=-dbzI20Yavs",
                        "name": "Catalan"
                    },
                    {
                        "url": "https://www.youtube.com/watch?v=CD1IFsPO_Jw",
                        "name": "Hindi"
                    },
                    {
                        "url": "https://www.youtube.com/watch?v=BG5JRs-hKfo",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://www.cs.cmu.edu/~kkandasa/pubs/kandasamyIJCAI15activePostEst.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Aseem Saxena",
                    "Sourav Singh"
                ],
                "video": "https://www.youtube.com/embed/fxqBkVvkdB8",
                "pdf": "https://www.cs.cmu.edu/~kkandasa/pubs/kandasamyIJCAI15activePostEst.pdf",
                "audio": [
                    "Briana Berger"
                ],
                "scripting": [
                    "Aseem Saxena",
                    "Sourav Singh",
                    "Briana Berger",
                    "Ahmed Nasser",
                    "Tanveet Singh",

                ],
                "description": "Published on April 04, 2017 - Public link - IJCAI 2016 (best paper)"
            },
            {
                "name": "Understanding deep learning requires rethinking generalization",
                "doi": "10.1109/CVPR.2016.308",
                "video_links": [
                    {
                        "url": "https://www.youtube.com/watch?v=vdB5CdCZXPw",
                        "name": "Nepali"
                    },
                    {
                        "url": "https://www.youtube.com/watch?v=sEVAi8BX_xU",
                        "name": "Spanish"
                    },
                    {
                        "url": "https://www.youtube.com/watch?v=4H2zAetUWlc",
                        "name": "Tamil"
                    },
                    {
                        "url": "https://www.youtube.com/watch?v=qpoQGR6CxIU",
                        "name": "Marathi"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://openreview.net/pdf?id=Sy8gdB9xx",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Srishti Sharma",
                    "Venkata Karthik Gullapalli",
                    "Shashi Gharti"
                ],
                "video": "https://www.youtube.com/embed/s47Vl44WDQw",
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
                        "url": "https://www.youtube.com/watch?v=wp61mchoukA",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://arxiv.org/pdf/1602.07415.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Afelio Padilla",
                    "Anurag Singh",
                    "Luv Aggarwal"
                ],
                "video": "https://www.youtube.com/embed/cfqOow-GelA",
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
                        "url": "https://www.youtube.com/watch?v=xuj7eePpAks",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www.aclweb.org/anthology/N16-1181",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Anshu Aviral",
                    "Suvarna Saumya",
                    "Mashrin Srivastava"
                ],
                "video": "https://www.youtube.com/embed/PaBJDHVmMNY",
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
                        "url": "https://www.youtube.com/watch?v=9SHnYYhHW-c",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www.epasto.org/papers/kdd2015.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Rahul Ahuja",
                    "Aditya Gupta",
                    "Austin Gomez"
                ],
                "video": "https://www.youtube.com/embed/o6GsHGtFuqk",
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
                    "Ruchika Salwan",

                ],
                "description": "Published on April 04, 2017 - Public link - KDD 2015 (best paper)"
            },
            {
                "name": "DeepEar: Robust Smartphone Audio Sensing in Unconstrained Acoustic Environments using Deep Learning",
                "doi": "10.1145/2750858.2804262",
                "video_links": [
                    {
                        "url": "https://www.youtube.com/watch?v=6HTl336nmCM",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://niclane.org/pubs/ubicomp_deepear.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Shubham Jain",
                    "Aditya Narayan",
                    "Manav Bharambe",
                    "Myra Cheng"
                ],
                "video": "https://www.youtube.com/embed/MdDyvBIWqGo",
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
                    "Amanda Chiu",

                ],
                "description": "Published on April 04, 2017 - Public link - UBICOMP 2015 (best paper)"
            },
            {
                "name": "Finding Email in a Multi-Account, Multi-Device World",
                "doi": "10.1145/2858036.2858473",
                "video_links": [
                    {
                        "url": "https://www.youtube.com/watch?v=JR0uki26O6o",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2016/06/chi16-2.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Aditya Chaterjee",
                    "Nilan Saha"
                ],
                "video": "https://www.youtube.com/embed/CZS0U7rr0zU",
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
                    "Mukunda Madhava Nath",

                ],
                "description": "Published on April 04, 2017 - Public link - CHI 2016 (best paper)"
            },
            {
                "name": "The Effect of Visual Appearance on the Performance of Continuous Sliders and Visual Analogue Scales",
                "doi": "10.1145/2858036.2858063",
                "video_links": [
                    {
                        "url": "https://www.youtube.com/watch?v=GbyTWb5JdHE",
                        "name": "Spanish"
                    },
                    {
                        "url": "https://www.youtube.com/watch?v=irPi4qlCPu8",
                        "name": "Chinese"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "http://www.dgp.toronto.edu/~tovi/papers/vas.pdf",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Grace Kang",
                    "Audrey Ho"
                ],
                "video": "https://www.youtube.com/embed/iDI7BtUMcGg",
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
                        "url": "https://www.youtube.com/watch?v=qwlbkLEDk50",
                        "name": "Spanish"
                    }
                ],
                "pdf_links": [
                    {
                        "url": "https://hal.inria.fr/hal-01391281/document",
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Harsh Vardhan",
                    "Punit Vara",
                    "Katie Mishra"
                ],
                "video": "https://www.youtube.com/embed/vqSuQkhKP0A",
                "pdf": "https://hal.inria.fr/hal-01391281/document",
                "audio": [
                    "Katie Mishra"
                ],
                "scripting": [
                    "Harsh Vardhan",
                    "Punit Vara",
                    "Katie Mishra",
                    "Suvendu Kumar Dash",

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
                        "name": "Public"
                    }
                ],
                "dri": [
                    "Afelio Padilla",
                    "Ashrith Sheshan",
                    "Dilrukshi Gamage",
                    "Tejas Sarma"
                ],
                "video": "https://www.youtube.com/embed/solWTf_KDXI",
                "pdf": "https://groups.csail.mit.edu/uid/other-pubs/vizwiz.pdf",
                "audio": [
                    "Akshat Mishra",
                    "Lenny Khazan",
                    "Rohan Kapur"
                ],
                "scripting": [],
                "description": "Jeffrey P. Bigham, at. al. 2010. VizWiz: nearly real-time answers to visual questions. In Proceedings of the 23nd annual ACM symposium on User interface software and technology (UIST '10)."
            },
            {
                "name": "A Convex Polynomial Force-Motion Model for Planar Sliding: Identification and Application",
                "description": "Jiaji Zhou and Robert Paolini and J. Andrew Bagnell and Matthew T. Mason: A convex polynomial force-motion model for planar sliding: Identification and application, 2016 IEEE International Conference on Robotics and Automation (ICRA), year=2016, pages=372-377",
                "doi": "10.1109/ICRA.2016.7487155",
                "published_on": "June 9, 2016",
                "pdf_links": [
                    {
                        "name": "ieeexplore.ieee.org",
                        "url": "http://ieeexplore.ieee.org/document/7487155/"
                    },
                    {
                        "name": "Public link",
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
                "video_links": [
                    {
                        "name": "Spanish",
                        "url": "https://stanfordscholar.org/media/343/videos/video.mp4"
                    },
                    {
                        "name": "Catalan",
                        "url": "https://stanfordscholar.org/media/344/videos/video.mp4"
                    },
                    {
                        "name": "French",
                        "url": "https://stanfordscholar.org/media/347/videos/video.mp4"
                    }
                ]
            },
            {
                "name": "Deep Face Deblurring",
                "description": "Grigorios G. Chrysos, Stefanos Zafeiriou, Deep Face Deblurring",
                "published_on": "Submitted on 27 Apr 2017 (v1), last revised 25 May 2017",
                "pdf_links": [
                    {
                        "name": "Public link",
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
                "video_links": [
                    {
                        "name": "Spanish",
                        "url": "https://stanfordscholar.org/media/345/videos/video.mp4"
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
                        "name": "scopus.com",
                        "url": "https://www.scopus.com/record/display.uri?eid=2-s2.0-84949772686&origin=inward&txGid=7F7BD756CBF30FC16A1611420A12CC8A.wsnAw8kcdt7IPYLO0V48gA%3a2"
                    },
                    {
                        "name": "Public link",
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
                "video_links": []
            },
            {
                "name": "Naturalizing a Programming Language via Interactive Learning",
                "description": "Sida I. Wang, Samuel Ginn, Percy Liang, Christopher D. Manning, Naturalizing a Programming Language via Interactive Learning, Association for Computational Linguistics (ACL), 2017",
                "published_on": "April 23, 2017",
                "pdf_links": [
                    {
                        "name": "Public link",
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
                "video_links": []
            },
            {
                "name": "Optimal and Adaptive Algorithms for Online Boosting",
                "description": "Alina Beygelzimer, Satyen Kale and Haipeng Luo, Optimal and Adaptive Algorithms for Online Boosting, Proceedings of the Twenty-Fifth International Joint Conference on Artificial Intelligence (IJCAI-16), Best Paper Award winner",
                "published_on": "February, 2015",
                "pdf_links": [
                    {
                        "name": "ijcai.org",
                        "url": "https://www.ijcai.org/Proceedings/16/Papers/614.pdf"
                    },
                    {
                        "name": "Public link",
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
                "video_links": []
            },
            {
                "name": "ColourID: Improving Colour n for People with Impaired Colour VisionIdentification",
                "description": "David R. Flatla, Alan R. Andrade, Ross D. Teviotdale, Dylan L. Knowles and \tCraig Stewart, ColourID: Improving Colour n for People with Impaired Colour VisionIdentification, CHI'15 Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems pp. 3543-3552",
                "doi": "10.1145/2702123.2702578",
                "published_on": "April, 2015",
                "pdf_links": [
                    {
                        "name": "dl.acm.org",
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
                "video_links": []
            },
            {
                "name": "ViBand: High-Fidelity Bio-Acoustic Sensing Using Commodity Smartwatch Accelerometers",
                "description": "Gierad Laput Robert Xiao Chris Harrison, ViBand: High-Fidelity Bio-Acoustic Sensing Using Commodity Smartwatch Accelerometers, UIST'16 Proceedings of the 29th Annual Symposium on User Interface Software and Technology pp. 321-333",
                "doi": "10.1145/2984511.2984582",
                "published_on": "October, 2016",
                "pdf_links": [
                    {
                        "name": "dl.acm.org",
                        "url": "http://dl.acm.org/citation.cfm?id=2984582&picked=formats&CFID=771829000&CFTOKEN=80512108"
                    },
                    {
                        "name": "Public link",
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
                "video_links": []
            },
            {
                "name": "NormalTouch and TextureTouch: High-fidelity 3D Haptic Shape Rendering on Handheld Virtual Reality Controllers",
                "description": "Hrvoje Benko, Christian Holz, Mike Sinclair, Eyal Ofek, NormalTouch and TextureTouch: High-fidelity 3D Haptic Shape Rendering on Handheld Virtual Reality Controllers, UIST'16 Proceedings of the 29th Annual Symposium on User Interface Software and Technology, Pages 717-728",
                "doi": "10.1145/2984511.2984526",
                "published_on": "October, 2016",
                "pdf_links": [
                    {
                        "name": "dl.acm.org",
                        "url": "http://dl.acm.org/citation.cfm?id=2984526&picked=formats&CFID=771829000&CFTOKEN=80512108"
                    },
                    {
                        "name": "Public link",
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
                "video_links": []
            },
            {
                "name": "The Social Impact of a Robot Co-Worker in Industrial Settings",
                "description": "Allison Sauppe and Bilge Mutlu,The Social Impact of a Robot Co-Worker in Industrial Settings, CHI'15 Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems, pp. 3613-3622 ",
                "doi": "10.1109/ICRA.2016.7487155",
                "published_on": "April, 2015",
                "pdf_links": [
                    {
                        "name": "dl.acm.org",
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
                "video_links": [
                    {
                        "name": "Mandarin",
                        "url": "https://stanfordscholar.org/media/355/videos/video.mp4"
                    }
                ]
            }
        ];

        // vm.papers = vm.papers.slice(0, 9);


        vm.papers = lodash.map(vm.papers, function (paper){
            paper.image = 'https://i.ytimg.com/vi/'+paper.video.replace('https://www.youtube.com/embed/', '').replace('https://youtu.be/', '') +'/maxresdefault.jpg';
            return paper;
        });

        vm.featured_papers = vm.papers.slice(0, 3);

        function has_error(field_name) {
            var field = $scope.form[field_name];
            return (field.$touched || vm.submitted) && field.$invalid;
        }


    }

})();
