// =========================================================================
// 1. SAFE MASTER DATA BLOCK
// =========================================================================
const masterStudyDatabase = {
    "anc_ch1": {
        title: "अध्याय 1: प्रागैतिहासिक काल (Prehistoric Period)",
        theory: [
            "<strong>प्राक्-इतिहास:</strong> लिखित अभिलेखों से पहले का अतीत; इसकी जानकारी पुरातात्विक साक्ष्यों से मिलती है।",
            "<strong>मुख्य साक्ष्य:</strong> पत्थर के औज़ार, शैलाश्रय और शैलचित्र।",
            "<strong>शैलचित्रों के विषय:</strong> पशु, शिकार, भोजन जुटाना, नृत्य और समूह-जीवन। ये उस समय के जीवन के संकेत देते हैं, पूरा लिखित विवरण नहीं।",
            "<strong>कालखंड:</strong> पुरापाषाण में खुरदरे औज़ार; मध्यपाषाण में छोटे सूक्ष्म पाषाण; नवपाषाण में खेती और बसे हुए गाँव; ताम्रपाषाण में पत्थर के साथ ताँबा।",
            "<strong>कला-अध्ययन:</strong> PDF में उत्तर पुरापाषाण, मध्यपाषाण और ताम्रपाषाण के उदाहरण भी हैं; कालक्रम और समय क्षेत्र के अनुसार बदल सकते हैं।",
            "<strong>महत्त्वपूर्ण स्थल:</strong> भीमबेटका के शैलाश्रय मध्य प्रदेश में हैं; दक्षिण भारत में भी प्रागैतिहासिक शैलचित्र मिले हैं।"
        ],
        studyAid: {
            title: "पाषाण काल: त्वरित तुलना",
            columns: ["कालखंड", "औज़ार", "जीवन की प्रमुख विशेषता"],
            rows: [
                ["पुरापाषाण", "खुरदरे पत्थर के औज़ार", "शिकार और खाद्य-संग्रह"],
                ["मध्यपाषाण", "छोटे सूक्ष्म पाषाण (माइक्रोलिथ)", "शिकार और खाद्य-संग्रह के विविध तरीके"],
                ["नवपाषाण", "घिसे/पॉलिश किए पत्थर के औज़ार", "खेती, पशुपालन और स्थायी बस्तियाँ"],
                ["ताम्रपाषाण", "पत्थर के साथ ताँबे के औज़ार", "कृषि और ग्रामीण बस्तियाँ"]
            ]
        },
        imageUrl: "assets/prehistoric-quick-review.svg",
        imageAlt: "प्रागैतिहासिक काल के औज़ारों के चरण और शैलचित्रों के विषय दिखाता मौलिक त्वरित-पुनरावृत्ति चित्र",
        questions: [
            {
                q: "प्रागैतिहासिक काल को पहचानने का मुख्य आधार क्या है?",
                options: ["लिखित सरकारी अभिलेख", "पुरातात्विक अवशेष और औजार", "मुद्रित पुस्तकें", "समाचार पत्र"],
                correctIndex: 1,
                explanation: "इस काल के लिखित अभिलेख उपलब्ध नहीं हैं; इसकी जानकारी औजारों, अवशेषों और शैलचित्रों से मिलती है।"
            },
            {
                q: "पुरापाषाण काल के मनुष्य का मुख्य जीवन-निर्वाह क्या था?",
                options: ["व्यापार और उद्योग", "शिकार और खाद्य-संग्रह", "केवल खेती", "समुद्री व्यापार"],
                correctIndex: 1,
                explanation: "पुरापाषाण काल में मनुष्य मुख्यतः शिकार करता और प्राकृतिक खाद्य-स्रोतों को इकट्ठा करता था।"
            },
            {
                q: "पुरापाषाण काल के औजार सामान्यतः कैसे होते थे?",
                options: ["मशीन से बने लोहे के", "खुरदरे और टूटे हुए पत्थर के", "ताँबे के सिक्कों जैसे", "कागज से बने"],
                correctIndex: 1,
                explanation: "पुरापाषाण काल में पत्थर को तोड़कर खुरदरे औजार बनाए जाते थे।"
            },
            {
                q: "मध्यपाषाण काल के छोटे पत्थर के औजार क्या कहलाते हैं?",
                options: ["मेगालिथ", "माइक्रोलिथ", "मुद्राएँ", "शिलालेख"],
                correctIndex: 1,
                explanation: "मध्यपाषाण काल के छोटे पत्थर के औजारों को सूक्ष्म पाषाण या माइक्रोलिथ कहा जाता है।"
            },
            {
                q: "मध्यपाषाण काल, किस काल के बाद और किससे पहले आता है?",
                options: ["नवपाषाण के बाद, लौह युग से पहले", "पुरापाषाण के बाद, नवपाषाण से पहले", "ताम्रपाषाण के बाद, पुरापाषाण से पहले", "लौह युग के बाद, ऐतिहासिक काल से पहले"],
                correctIndex: 1,
                explanation: "मध्यपाषाण काल पुरापाषाण और नवपाषाण काल के बीच का संक्रमणकाल है।"
            },
            {
                q: "भीमबेटका शैलाश्रय किस भारतीय राज्य में स्थित हैं?",
                options: ["मध्य प्रदेश", "बिहार", "गुजरात", "असम"],
                correctIndex: 0,
                explanation: "भीमबेटका के प्रसिद्ध शैलाश्रय और शैलचित्र मध्य प्रदेश में स्थित हैं।"
            },
            {
                q: "नवपाषाण काल की एक प्रमुख विशेषता क्या थी?",
                options: ["खेती और पशुपालन का विकास", "मुद्रण कला का आविष्कार", "भाप इंजन का उपयोग", "कागजी मुद्रा का चलन"],
                correctIndex: 0,
                explanation: "नवपाषाण काल में खेती और पशुपालन विकसित हुए और स्थायी बस्तियों का विस्तार हुआ।"
            },
            {
                q: "नवपाषाण काल के घिसकर चिकने किए गए पत्थर के औजारों को किससे पहचाना जाता है?",
                options: ["उनकी चमकदार, घिसी हुई धार से", "उन पर लिखे अक्षरों से", "उनमें लोहे की परत से", "उनके कागज से बने होने से"],
                correctIndex: 0,
                explanation: "नवपाषाण काल के औजारों को घिसकर और पॉलिश करके अधिक चिकना बनाया जाता था।"
            },
            {
                q: "मेहरगढ़ किस कारण से विशेष रूप से जाना जाता है?",
                options: ["शुरुआती कृषि-आधारित बस्ती के साक्ष्यों के लिए", "मौर्य साम्राज्य की राजधानी के लिए", "गुप्तकालीन विश्वविद्यालय के लिए", "मुगलकालीन बंदरगाह के लिए"],
                correctIndex: 0,
                explanation: "मेहरगढ़ दक्षिण एशिया के शुरुआती कृषि और पशुपालन से जुड़े स्थलों में से एक है।"
            },
            {
                q: "ताम्रपाषाण काल की प्रमुख पहचान क्या है?",
                options: ["केवल लोहे के औजार", "पत्थर के साथ ताँबे के औजारों का उपयोग", "कांस्य के सिक्कों का व्यापक चलन", "लिखित संविधान का निर्माण"],
                correctIndex: 1,
                explanation: "ताम्रपाषाण काल में पत्थर के औजारों के साथ ताँबे का भी उपयोग किया जाता था।"
            }
        ]
    },
    "anc_ch2": {
        title: "अध्याय 2: सिंधु घाटी सभ्यता",
        theory: [
            "सिंधु घाटी सभ्यता को हड़प्पा सभ्यता भी कहा जाता है, क्योंकि इसके प्रमुख स्थलों में सबसे पहले हड़प्पा की पहचान हुई। यह दक्षिण एशिया की सबसे प्राचीन नगरीय सभ्यताओं में से एक थी। इसका परिपक्व हड़प्पा चरण लगभग 2600 ईसा पूर्व से 1900 ईसा पूर्व तक माना जाता है।",
            "<strong>हड़प्पा: ऐतिहासिक परिचय</strong> — सिंधु घाटी सभ्यता के जिन स्थलों की पहचान सबसे पहले हुई, उनमें हड़प्पा प्रमुख था; इसी कारण इसे हड़प्पा सभ्यता भी कहा जाता है। 1921 में दयाराम साहनी ने यहाँ खुदाई की; माधो स्वरूप वत्स ने बाद के उत्खननों में योगदान दिया। यह वर्तमान पाकिस्तान के पंजाब प्रांत के साहीवाल (पुराना नाम मोंटगोमरी) क्षेत्र में रावी नदी के पुराने प्रवाह के निकट स्थित है। नगर में पश्चिमी ऊँचा दुर्ग-क्षेत्र और पूर्वी निचले नगर के अवशेष मिले हैं।",
            "<strong>नगर और पुरातात्विक साक्ष्य:</strong> हड़प्पा के माउंड F में दो कतारों में बने 12 बड़े ईंट-निर्मित कक्ष मिले हैं, जिन्हें परंपरागत रूप से अन्नागार कहा गया है; उनका कुल क्षेत्रफल लगभग 838 वर्ग मीटर बताया जाता है, पर उनकी पहचान और उपयोग पर विद्वानों में बहस है। इनके पास श्रमिक आवास और अनाज कूटने/प्रसंस्करण से जोड़े गए 18 वृत्ताकार चबूतरे भी मिले। यहाँ कांस्य की इक्का-गाड़ी का नमूना, कब्रिस्तान R-37 और कब्रिस्तान H के अवशेष भी उल्लेखनीय हैं।",
            "<strong>मुहरें और विशेष महत्व:</strong> हड़प्पा से बड़ी संख्या में अभिलेखयुक्त, प्रायः चौकोर सेलखड़ी (steatite) की मुहरें मिली हैं। एक मुहर पर स्त्री आकृति के गर्भ से पौधा निकलता दिखाया गया है; इसे उर्वरता/मातृदेवी से जोड़कर समझा गया है, हालांकि ऐसी धार्मिक व्याख्याएँ निश्चित प्रमाण नहीं हैं। ध्यान दें: 12 कक्षों वाले तथाकथित अन्नागार माउंड F से जोड़े जाते हैं, माउंड AB से नहीं।",
            "हड़प्पाई नगरों में योजनाबद्ध सड़कें, पकी ईंटों के मकान और जल-निकासी की सुव्यवस्थित नालियाँ मिलती हैं। कई नगरों में ऊँचा दुर्ग क्षेत्र और निचला नगर दिखाई देता है। मानकीकृत ईंटों और बाट-माप से संगठित निर्माण तथा व्यापार का संकेत मिलता है।",
            "मोहनजोदड़ो का विशाल स्नानागार इस सभ्यता के प्रसिद्ध सार्वजनिक निर्माणों में है। धोलावीरा जल-संग्रह और नगर-योजना के लिए जाना जाता है। लोथल गुजरात का एक महत्वपूर्ण हड़प्पाई स्थल है, जिसे परंपरागत रूप से गोदी या बंदरगाह से जोड़ा जाता है।",
            "हड़प्पाई लोग खेती, पशुपालन, शिल्प और व्यापार करते थे। गेहूँ, जौ तथा अन्य फसलों के प्रमाण मिले हैं। मुहरें, मनके, मिट्टी के बर्तन और धातु की वस्तुएँ उनके शिल्प-कौशल को दर्शाती हैं। मेसोपोटामिया के साथ व्यापारिक संपर्क के भी प्रमाण मिलते हैं।",
            "हड़प्पाई लिपि वाली अनेक मुहरें और अन्य वस्तुएँ मिली हैं, लेकिन यह लिपि अभी तक पढ़ी नहीं जा सकी है। इसलिए उनकी भाषा, शासन-व्यवस्था और धार्मिक विश्वासों के बारे में कई बातें निश्चित रूप से कहना संभव नहीं है। लगभग 1900 ईसा पूर्व के बाद कई नगरों का पतन हुआ और बस्तियों में क्षेत्रानुसार बदलाव आए; इसके एक ही निश्चित कारण पर विद्वानों की सहमति नहीं है।"
        ],
        imageUrl: "",
        questions: [
            {
                q: "हड़प्पा पुरास्थल की खोज किस वर्ष और किसके द्वारा की गई थी?",
                options: ["1922 में राखालदास बनर्जी द्वारा", "1921 में दयाराम साहनी द्वारा", "1931 में जॉन मार्शल द्वारा", "1921 में आर. एस. बिष्ट द्वारा"],
                correctIndex: 1,
                explanation: "हड़प्पा की खोज वर्ष 1921 में दयाराम साहनी ने की थी जो इस सभ्यता का खोजा जाने वाला पहला स्थल था।"
            },
            {
                q: "हड़प्पा पुरास्थल निम्नलिखित में से किस नदी के तट पर स्थित है?",
                options: ["सिंधु नदी", "घग्गर नदी", "रावी नदी", "भोगवा नदी"],
                correctIndex: 2,
                explanation: "हड़प्पा रावी नदी के बाएं तट पर मोंटगोमरी (साहीवाल) जिले में स्थित है।"
            },
            {
                q: "हड़प्पा के दुर्ग (Citadel) क्षेत्र के बाहर उत्तर की ओर से प्राप्त सबसे विशिष्ट पुरातात्विक संरचना कौन सी है?",
                options: ["छह अन्नागारों (Granaries) की एक पंक्ति", "विशाल स्नागार (Great Bath)", "कांस्य की नर्तकी की मूर्ति", "पशुपतिनाथ (शिव) की मुहर"],
                correctIndex: 0,
                explanation: "हड़प्पा के टीले के पास नदी के निकट छह अन्नागारों की दो पंक्तियाँ (कुल बारह या छह की कतार) मिली हैं जो खाद्यान्न भंडारण को दर्शाती हैं।"
            },
            {
                q: "हड़प्पा सभ्यता से प्राप्त 'कब्रिस्तान R-37' और 'कब्रिस्तान H' का संबंध मुख्य रूप से किस पुरास्थल से है?",
                options: ["लोथल", "कालीबंगा", " मोहनजोदड़ो", "हड़प्पा"],
                correctIndex: 3,
                explanation: "हड़प्पा पुरास्थल के दक्षिणी भाग से कब्रिस्तान R-37 और बाद के काल का कब्रिस्तान H खोजा गया है।"
            },
            {
                q: "हड़प्पाई नगरों की प्रमुख विशेषता क्या थी?",
                options: ["योजनाबद्ध सड़कें और जल-निकासी व्यवस्था", "केवल लकड़ी के अस्थायी घर", "पहाड़ी गुफाओं में बस्तियाँ", "सड़कों और नालियों का अभाव"],
                correctIndex: 0,
                explanation: "हड़प्पाई नगर अपनी योजनाबद्ध सड़कों, पकी ईंटों के मकानों और सुव्यवस्थित नालियों के लिए प्रसिद्ध हैं।"
            },
            {
                q: "हड़प्पा से प्राप्त 'तांबे की बनी बैलगाड़ी' (Copper Chariot) क्या इंगित करती है?",
                options: ["युद्ध में रथों के व्यापक प्रयोग को", "परिवहन, धातुशिल्प और तकनीकी कौशल को", "लोहे के अस्त्र-शस्त्र निर्माण को", "विदेशी व्यापार के लिए नौकाओं के प्रयोग को"],
                correctIndex: 1,
                explanation: "तांबे की बैलगाड़ी तत्कालीन समय में परिवहन के साधनों और ताम्र-गलन/धातुशिल्प की उन्नत तकनीकी क्षमता को दर्शाती है।"
            },
            {
                q: "हड़प्पा कालीन नगर योजना और सड़कों की बनावट के संबंध में कौन सा कथन सर्वाधिक उपयुक्त है?",
                options: ["सड़कें व गलियाँ वक्रकार एवं अनियमित थीं", " घरों के दरवाजे मुख्य सड़क की ओर खुलते थे", "नगर ग्रिड पद्धति पर आधारित थे तथा उन्नत जल निकास प्रणाली थी", "पक्के ईंटों का प्रयोग केवल मंदिरों के निर्माण में होता था"],
                correctIndex: 2,
                explanation: "हड़प्पा सभ्यता की नगर योजना ग्रिड पैटर्न पर आधारित थी और ढकी हुई नालियों की उन्नत जल निकास प्रणाली इसकी मुख्य विशेषता थी।"
            },
            {
                q: "लोथल किस वर्तमान भारतीय राज्य में स्थित हड़प्पाई स्थल है?",
                options: ["राजस्थान", "गुजरात", "हरियाणा", "पंजाब"],
                correctIndex: 1,
                explanation: "लोथल गुजरात में स्थित एक महत्वपूर्ण हड़प्पाई स्थल है।"
            },
            {
                q: "हड़प्पाई लिपि के बारे में वर्तमान में क्या सही है?",
                options: ["इसे पूरी तरह पढ़ लिया गया है", "यह केवल संस्कृत में लिखी गई थी", "यह अभी तक पढ़ी नहीं जा सकी है", "इसमें केवल रोमन अक्षर हैं"],
                correctIndex: 2,
                explanation: "हड़प्पाई लिपि के चिह्न मिले हैं, लेकिन विद्वान अभी तक इसे निश्चित रूप से पढ़ नहीं पाए हैं।"
            },
            {
                q: "हड़प्पाई सभ्यता के व्यापारिक संपर्कों के प्रमाण किस प्राचीन क्षेत्र से मिले हैं?",
                options: ["मेसोपोटामिया", "रोम", "जापान", "मध्य अमेरिका"],
                correctIndex: 0,
                explanation: "पुरातात्विक और लिखित साक्ष्य हड़प्पाई सभ्यता के मेसोपोटामिया के साथ व्यापारिक संपर्क दर्शाते हैं।"
            },
            { q: "सिंधु घाटी सभ्यता को किस अन्य नाम से जाना जाता है?",
                options: ["वैदिक सभ्यता", "हड़प्पा सभ्यता", "मौर्य सभ्यता", "गुप्त सभ्यता"],
                correctIndex: 1,
                explanation: "सिंधु घाटी सभ्यता को हड़प्पा सभ्यता के नाम से भी जाना जाता है।"
            },
            {q:"हड़प्पा सभ्यता किस युग की सभ्यता थी?",
                options:["नवपाषाण युग", "पुरापाषाण", "लौह युग", "कांस्य युग"],
                correctIndex: 3,
                explanation: "हड़प्पा सभ्यता कांस्य युग की सभ्यता थी।"
            },
            { q: "हड़प्पा स्थल की खोज किसने की थी?", 
                options: ["आर. डी. बनर्जी", "दयाराम साहनी", "जॉन मार्शल", "अलेक्जेंडर कनिंघम"],
                correctIndex: 1,
                explanation: "हड़प्पा स्थल की खोज दयाराम साहनी ने की थी।"
            },
            { q: "मोहनजोदड़ो की खोज किसने की थी?",
                options: ["आर. डी. बनर्जी", "दयाराम साहनी", "जॉन मार्शल", "अलेक्जेंडर कनिंघम"],
                correctIndex: 0,
                explanation: "मोहनजोदड़ो की खोज राखालदास बनर्जी ने की थी।"
            },
            { q: "मोहनजोदड़ो की खोज किस वर्ष हुई थी?",
                options: ["1921", "1922", "1923", "1924"],
                correctIndex: 1,
                explanation: "मोहनजोदड़ो की खोज 1922 में हुई थी।"
            },
            { q: "हड़प्पा सभ्यता की खोज की आधिकारिक घोषणा 1924 में किसने की थी?",
                options: ["आर. डी. बनर्जी", "दयाराम साहनी", "जॉन मार्शल", "अलेक्जेंडर कनिंघम"],
                correctIndex: 2,
                explanation: "हड़प्पा सभ्यता की खोज की आधिकारिक घोषणा 1924 में जॉन मार्शल ने की थी।"
            },
        ]
    },
    "anc_ch3": {
        title: "अध्याय 3: वैदिक काल (Vedic Period)",
        theory: [
            "वैदिक काल का ज्ञान मुख्यतः वेदों और उनसे जुड़े साहित्य से मिलता है। इस काल को सामान्यतः ऋग्वैदिक (प्रारंभिक) और उत्तर वैदिक चरणों में बाँटा जाता है। इन चरणों की तिथियाँ अनुमानित हैं और इतिहासकारों के बीच इनमें कुछ मतभेद हैं।",
            "ऋग्वैदिक चरण का प्रमुख साहित्य ऋग्वेद है, जो सबसे प्राचीन वेद माना जाता है। ऋग्वेद में स्तुति के सूक्त और उस समय के समाज, जीवन तथा देवताओं के उल्लेख मिलते हैं। इस चरण में वैदिक समुदायों का प्रमुख क्षेत्र सप्त-सिंधु कहलाने वाला उत्तर-पश्चिमी भूभाग था।",
            "प्रारंभिक वैदिक समाज मुख्यतः जन और कुल पर आधारित था। पशुपालन, विशेषकर गाय, जीवन और संपत्ति का महत्वपूर्ण हिस्सा था; खेती भी की जाती थी। सभा और समिति जैसी जन-संस्थाओं का उल्लेख मिलता है। राजा या राजन जन का नेतृत्व करता था, लेकिन उसके अधिकारों को निरंकुश मानने का आधार नहीं है।",
            "उत्तर वैदिक चरण में बस्तियों का विस्तार पूर्व की ओर गंगा-यमुना के मैदान तक हुआ। कृषि का महत्व बढ़ा और लोहे के उपयोग के प्रमाण मिलते हैं। बड़े जनसमूहों और जनपदों का विकास हुआ तथा राजनीतिक संगठन पहले की तुलना में अधिक जटिल बने।",
            "उत्तर वैदिक साहित्य में यजुर्वेद, सामवेद और अथर्ववेद के साथ ब्राह्मण, आरण्यक और उपनिषद ग्रंथ भी शामिल हैं। यज्ञ और अनुष्ठानों का महत्व बढ़ा। वर्ण-व्यवस्था का उल्लेख अधिक स्पष्ट हुआ, हालांकि समाज और उसका स्वरूप समय तथा क्षेत्र के अनुसार बदलता रहा।",
            "वेदों की संख्या चार है: ऋग्वेद, सामवेद, यजुर्वेद और अथर्ववेद। ऋग्वेद में सूक्त, सामवेद में गायन के लिए व्यवस्थित मंत्र, यजुर्वेद में यज्ञ से संबंधित मंत्र और निर्देश, तथा अथर्ववेद में विविध विषयों के मंत्र मिलते हैं। वैदिक साहित्य को समझते समय इसे एक ही समय में बना हुआ ग्रंथ-समूह नहीं, बल्कि लंबे समय में विकसित परंपरा के रूप में देखना चाहिए।"
        ],
        imageUrl: "",
        questions: [
            {
                q: "वैदिक काल के अध्ययन का मुख्य साहित्यिक स्रोत क्या है?",
                options: ["वेद और उनसे जुड़ा साहित्य", "मुगलकालीन दरबारी इतिहास", "यूनानी नाटक", "आधुनिक समाचार पत्र"],
                correctIndex: 0,
                explanation: "वैदिक काल की जानकारी मुख्यतः वेदों और उनसे संबंधित साहित्य से मिलती है।"
            },
            {
                q: "सबसे प्राचीन वेद किसे माना जाता है?",
                options: ["सामवेद", "यजुर्वेद", "ऋग्वेद", "अथर्ववेद"],
                correctIndex: 2,
                explanation: "ऋग्वेद को चारों वेदों में सबसे प्राचीन माना जाता है।"
            },
            {
                q: "ऋग्वैदिक चरण का प्रमुख क्षेत्र किस नाम से जाना जाता है?",
                options: ["मगध", "सप्त-सिंधु", "अवंतिका", "दक्षिणापथ"],
                correctIndex: 1,
                explanation: "ऋग्वैदिक समुदायों का प्रमुख क्षेत्र उत्तर-पश्चिम का सप्त-सिंधु भूभाग था।"
            },
            {
                q: "प्रारंभिक वैदिक समाज में सभा और समिति क्या थीं?",
                options: ["जन-संस्थाएँ", "व्यापारी जहाज", "कृषि के औजार", "कर वसूलने वाले सिक्के"],
                correctIndex: 0,
                explanation: "सभा और समिति का उल्लेख प्रारंभिक वैदिक जन-संस्थाओं के रूप में मिलता है।"
            },
            {
                q: "प्रारंभिक वैदिक जीवन में किस पशु का विशेष आर्थिक महत्व था?",
                options: ["गाय", "ऊँट", "हाथी", "याक"],
                correctIndex: 0,
                explanation: "पशुपालन में गाय का विशेष महत्व था और वह संपत्ति का एक महत्वपूर्ण रूप मानी जाती थी।"
            },
            {
                q: "उत्तर वैदिक चरण में बस्तियों का विस्तार मुख्यतः किस दिशा में हुआ?",
                options: ["पूर्व की ओर गंगा-यमुना के मैदान तक", "केवल थार मरुस्थल में", "हिमालय की चोटियों तक", "केवल समुद्री द्वीपों तक"],
                correctIndex: 0,
                explanation: "उत्तर वैदिक चरण में वैदिक समुदायों का विस्तार पूर्व की ओर गंगा-यमुना के मैदान तक हुआ।"
            },
            {
                q: "उत्तर वैदिक काल में कृषि के विकास के साथ किस धातु के उपयोग के प्रमाण मिलते हैं?",
                options: ["लोहा", "एल्युमिनियम", "प्लेटिनम", "यूरेनियम"],
                correctIndex: 0,
                explanation: "उत्तर वैदिक चरण में लोहे के उपयोग के प्रमाण मिलते हैं और कृषि का महत्व बढ़ा।"
            },
            {
                q: "यज्ञ से जुड़े मंत्रों और निर्देशों के लिए कौन-सा वेद विशेष रूप से जाना जाता है?",
                options: ["ऋग्वेद", "यजुर्वेद", "सामवेद", "अथर्ववेद"],
                correctIndex: 1,
                explanation: "यजुर्वेद में यज्ञ से जुड़े मंत्र और अनुष्ठान संबंधी निर्देश मिलते हैं।"
            },
            {
                q: "गायन के लिए व्यवस्थित मंत्रों से किस वेद का विशेष संबंध है?",
                options: ["सामवेद", "अथर्ववेद", "यजुर्वेद", "ऋग्वेद"],
                correctIndex: 0,
                explanation: "सामवेद के मंत्र मुख्यतः गायन के लिए व्यवस्थित किए गए हैं।"
            },
            {
                q: "वैदिक साहित्य के विकास के बारे में कौन-सा कथन उचित है?",
                options: ["सारा वैदिक साहित्य एक ही वर्ष में बना", "यह लंबे समय में विकसित हुई साहित्यिक परंपरा है", "इसमें केवल आधुनिक इतिहास शामिल है", "वेदों की संख्या दस है"],
                correctIndex: 1,
                explanation: "वैदिक साहित्य अलग-अलग चरणों में लंबे समय के दौरान विकसित हुआ; इसे एक ही समय में रचा गया नहीं मानना चाहिए।"
            }
        ]
    }
};

const mixedQuizQuestions = [
    { chapterId: "anc_ch1", questionIndex: 0 },
    { chapterId: "anc_ch2", questionIndex: 0 },
    { chapterId: "anc_ch3", questionIndex: 1 },
    { chapterId: "anc_ch1", questionIndex: 3 },
    { chapterId: "anc_ch2", questionIndex: 3 },
    { chapterId: "anc_ch3", questionIndex: 2 },
    { chapterId: "anc_ch1", questionIndex: 5 },
    { chapterId: "anc_ch2", questionIndex: 5 },
    { chapterId: "anc_ch3", questionIndex: 5 },
    { chapterId: "anc_ch1", questionIndex: 6 }
];

var mixedQuizIndex = 0;
var mixedQuizScore = 0;
var mixedQuizAnswered = false;
var mixedQuizSelectedIndex = -1;
var activePractice = null;
var pendingPractice = null;
var mockBuilderQuestions = [];

var currentStudent = null;
var studentAuthReady = false;
var currentAdmin = false;
var pendingStudentAction = null;
var adminTestQuestions = [];
var examAdminTests = [];

function getCurrentStudent() {
    return currentStudent;
}

function isStudentLoggedIn() {
    return studentAuthReady && !!currentStudent;
}

async function requestStudentApi(path, data, method) {
    if (window.location.protocol === "file:") {
        var serverRequiredError = new Error("ऐप चलाने के लिए Python server शुरू करके http://127.0.0.1:5000 खोलें।");
        serverRequiredError.status = 0;
        serverRequiredError.code = "server_required";
        throw serverRequiredError;
    }

    var isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    var response = await fetch(path, {
        method: method || (data ? "POST" : "GET"),
        credentials: "same-origin",
        headers: data ? (isFormData ? {} : { "Content-Type": "application/json" }) : {},
        body: data ? (isFormData ? data : JSON.stringify(data)) : undefined
    });
    var result = await response.json();
    if (!response.ok) {
        var error = new Error(result.error || "अनुरोध पूरा नहीं हो सका।");
        error.status = response.status;
        error.code = result.code || "";
        throw error;
    }
    return result;
}

function showStudentApiError(showMessage, error) {
    if (error.status === 429) {
        showMessage("बहुत अधिक प्रयास हुए हैं। कृपया कुछ देर बाद कोशिश करें।");
    } else if (error.status === 409) {
        showMessage(error.message);
    } else if (error.status === 400) {
        showMessage(error.message);
    } else if (error.status === 401) {
        showMessage(error.message);
    } else if (error.status === 410) {
        showMessage(error.message);
    } else if (error.status === 503 || error.status === 502) {
        showMessage(error.message);
    } else {
        showMessage("सर्वर से कनेक्शन नहीं हो सका। कृपया सर्वर चालू होने पर फिर कोशिश करें।");
    }
}

function initializeStudentAuthForms(container) {
    container.querySelectorAll(".student-login").forEach(function(form) {
        form.dataset.authStage = "start";
        form.dataset.startMarkup = form.innerHTML;
        refreshStudentCaptcha(form);
    });
}

async function submitStudentLogin(form, showMessage) {
    try {
        var username = (form.elements.username.value || "").trim();
        var password = form.elements.password.value || "";
        if (!username || !password) {
            showMessage("कृपया यूज़रनाम और पासवर्ड दर्ज करें।");
            return;
        }
        var result = await requestStudentApi("/api/auth/login", {
            username: username,
            password: password
        });
        completeStudentAuthentication(result);
    } catch (error) {
        showStudentApiError(showMessage, error);
    }
}

async function submitStudentRegistration(form, showMessage) {
    try {
        if (form.dataset.authStage === "otp") {
            var verified = await requestStudentApi("/api/auth/register/verify-otp", {
                challengeId: form.elements.challengeId.value,
                otp: (form.elements.otp.value || "").trim()
            });
            completeStudentAuthentication(verified);
            return;
        }
        var name = (form.elements.name.value || "").trim();
        var username = (form.elements.username.value || "").trim();
        var password = form.elements.password.value || "";
        var email = (form.elements.email.value || "").trim();
        if (!name || !username || !password || !email) {
            showMessage("पूरा नाम, यूज़रनेम, पासवर्ड और ईमेल जरूरी है।");
            return;
        }
        var result = await requestStudentApi("/api/auth/register", {
            name: name,
            username: username,
            password: password,
            email: email,
            captchaId: form.elements.captchaId.value,
            captchaCode: form.elements.captchaCode.value
        });
        showStudentOtpForm(form, result, "register");
    } catch (error) {
        if (error.code === "otp_expired") {
            resetStudentAuthForm(form);
        }
        showStudentApiError(showMessage, error);
        if (form.dataset.authStage !== "otp") refreshStudentCaptcha(form);
    }
}

function completeStudentAuthentication(result) {
    currentStudent = result.user;
    renderStudentAuthCard();
    finishStudentAuth();
}

function authCaptchaMarkup() {
    return '<div class="auth-captcha">' +
        '<div class="auth-captcha-image-row"><img class="auth-captcha-image" alt="CAPTCHA code">' +
        '<button type="button" class="auth-captcha-refresh" onclick="refreshStudentCaptcha(this.form);" aria-label="नया CAPTCHA लें">↻</button></div>' +
        '<label><span>चित्र में दिखा कोड दर्ज करें</span><input type="text" name="captchaCode" autocomplete="off" autocapitalize="characters" maxlength="8" required></label>' +
        '<input type="hidden" name="captchaId">' +
        '</div>';
}

async function refreshStudentCaptcha(form) {
    if (!form || !form.elements.captchaId) return;
    var image = form.querySelector(".auth-captcha-image");
    if (!image) return;
    try {
        var result = await requestStudentApi("/api/auth/captcha", {});
        form.elements.captchaId.value = result.challengeId;
        image.src = result.image;
        form.elements.captchaCode.value = "";
    } catch (error) {
        image.removeAttribute("src");
        var showMessage = form.closest(".student-auth-content") ?
            showStudentModalMessage : showStudentAuthMessage;
        if (error.code === "server_required") {
            showMessage(error.message);
        } else {
            console.error("Could not load the authentication CAPTCHA.", error);
            showMessage("CAPTCHA लोड नहीं हो सका। पेज रिफ्रेश करके फिर कोशिश करें।");
        }
    }
}

function resetStudentAuthForm(form) {
    if (!form.dataset.startMarkup) return;
    form.dataset.authStage = "start";
    form.innerHTML = form.dataset.startMarkup;
    refreshStudentCaptcha(form);
}

function showStudentOtpForm(form, result, flow) {
    form.dataset.authStage = "otp";
    form.dataset.authFlow = flow;
    var verifyLabel = "ईमेल सत्यापित करें और अकाउंट बनाएं";
    form.innerHTML = '<input type="hidden" name="challengeId" value="' + escapeHtml(result.challengeId) + '">' +
        '<p class="auth-otp-hint">OTP <strong>' + escapeHtml(result.emailHint) + '</strong> पर भेजा गया है।</p>' +
        '<label><span>6 अंकों का OTP</span><input type="text" name="otp" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" required></label>' +
        '<button type="submit">' + verifyLabel + '</button>' +
        '<button type="button" class="auth-back-button" onclick="resetStudentAuthForm(this.form);">वापस जाएँ</button>' +
        '<div class="auth-resend"><span>OTP नहीं मिला?</span><button type="button" onclick="resendStudentOtp(this.form);">दोबारा भेजें</button></div>' +
        authCaptchaMarkup();
    form.elements.captchaCode.required = false;
    refreshStudentCaptcha(form);
}

async function resendStudentOtp(form) {
    var showMessage = form.closest(".student-auth-content") ?
        showStudentModalMessage : showStudentAuthMessage;
    if (!form.elements.captchaCode.value.trim()) {
        showMessage("OTP दोबारा भेजने के लिए CAPTCHA कोड दर्ज करें।");
        return;
    }
    try {
        await requestStudentApi("/api/auth/otp/resend", {
            challengeId: form.elements.challengeId.value,
            captchaId: form.elements.captchaId.value,
            captchaCode: form.elements.captchaCode.value
        });
        showMessage("नया OTP भेज दिया गया है।");
    } catch (error) {
        showStudentApiError(showMessage, error);
    }
    refreshStudentCaptcha(form);
}

async function initializeStudentSession() {
    try {
        var result = await requestStudentApi("/api/auth/me");
        currentStudent = result.authenticated ? result.user : null;
    } catch (error) {
        if (error.status !== 401 && error.code !== "server_required") {
            console.error("Could not check the student session.", error);
        }
    }
    studentAuthReady = true;
    renderHeaderAuthActions();
    renderStudentAuthCard();
    if (currentStudent && typeof pendingStudentAction === "function") {
        var action = pendingStudentAction;
        pendingStudentAction = null;
        action();
    } else if (pendingStudentAction) {
        var pendingMessage = "कृपया लॉगिन करें या नया अकाउंट बनाएं ताकि आप प्रैक्टिस शुरू कर सकें।";
        var callback = pendingStudentAction;
        pendingStudentAction = null;
        openStudentAuthModal(pendingMessage);
        pendingStudentAction = callback;
    }
}

async function initializeAdminSession() {
    try {
        var result = await requestStudentApi("/api/admin/me");
        currentAdmin = result.authenticated === true;
    } catch (error) {
        currentAdmin = false;
        if (error.status !== 401 && error.code !== "server_required") {
            console.error("Could not check the admin session.", error);
        }
    }
    renderHeaderAuthActions();
}

function renderHeaderAuthActions() {
    var actions = document.getElementById("header-auth-actions");
    if (!actions) return;

    actions.replaceChildren();
    if (currentAdmin) {
        var adminButton = document.createElement("button");
        adminButton.className = "header-login admin-header-button";
        adminButton.type = "button";
        adminButton.textContent = "Content Admin";
        adminButton.addEventListener("click", openAdminPanel);
        actions.appendChild(adminButton);
    }

    var currentStudent = getCurrentStudent();

    if (currentStudent) {
        var studentName = document.createElement("span");
        studentName.className = "header-student-name";
        studentName.textContent = "Logged in: " + (currentStudent.name || currentStudent.username);

        var logoutButton = document.createElement("button");
        logoutButton.className = "header-logout";
        logoutButton.type = "button";
        logoutButton.textContent = "Log out";
        logoutButton.addEventListener("click", logoutStudent);

        actions.append(studentName, logoutButton);
        return;
    }

    var loginLink = document.createElement("a");
    loginLink.href = "#";
    loginLink.className = "header-login";
    loginLink.textContent = "Log in";
    loginLink.addEventListener("click", function(event) {
        event.preventDefault();
        openStudentAuthModal("", "login");
    });
    actions.appendChild(loginLink);
}

function renderStudentAuthCard(messageText) {
    var card = document.getElementById("student-auth-card");
    if (!card) return;

    var currentStudent = getCurrentStudent();
    var promptMessage = messageText || "";

    if (currentStudent) {
        card.innerHTML = '<span class="info-tag">STUDENT LOGIN</span>' +
            '<div class="student-account-box welcome-box">' +
                '<h3>स्वागत है, ' + escapeHtml(currentStudent.name || currentStudent.username) + '!</h3>' +
                '<p>अब आप किसी भी विषय का MCQ प्रैक्टिस कर सकते हैं।</p>' +
                '<button type="button" class="logout-btn" onclick="logoutStudent();">लॉग आउट</button>' +
            '</div>';
        return;
    }

    card.innerHTML = '<span class="info-tag">STUDENT LOGIN</span>' +
        '<div class="auth-toggle">' +
            '<button type="button" class="auth-tab active" data-mode="login" onclick="switchStudentAuthMode(this.dataset.mode);">लॉगिन</button>' +
            '<button type="button" class="auth-tab" data-mode="create" onclick="switchStudentAuthMode(this.dataset.mode);">Create New Account</button>' +
        '</div>' +
        '<div id="student-login-box" class="auth-box">' +
            '<form class="student-login" data-auth-flow="login" onsubmit="event.preventDefault(); loginStudent(this);">' +
                '<label><span>यूज़रनाम या ईमेल</span><input type="text" name="username" placeholder="यूज़रनाम या ईमेल" autocomplete="username" required></label>' +
                '<label><span>पासवर्ड</span><input type="password" name="password" placeholder="पासवर्ड" required></label>' +
                '<button type="submit">लॉगिन</button>' +
            '</form>' +
        '</div>' +
        '<div id="student-create-box" class="auth-box hidden">' +
            '<form class="student-login" data-auth-flow="register" onsubmit="event.preventDefault(); createStudentAccount(this);">' +
                '<label><span>पूरा नाम</span><input type="text" name="name" placeholder="अपना पूरा नाम" required></label>' +
                '<label><span>यूज़रनाम</span><input type="text" name="username" placeholder="नया यूज़रनाम" required></label>' +
                '<label><span>पासवर्ड (कम से कम 12 अक्षर)</span><input type="password" name="password" placeholder="नया पासवर्ड" minlength="12" maxlength="128" required></label>' +
                '<label><span>ईमेल</span><input type="email" name="email" placeholder="name@example.com" autocomplete="email" maxlength="254" required></label>' +
                authCaptchaMarkup() +
                '<button type="submit">Create Account</button>' +
            '</form>' +
        '</div>' +
        '<p id="student-auth-message" class="auth-message' + (promptMessage ? ' show' : '') + '">' + (promptMessage || '') + '</p>';
    initializeStudentAuthForms(card);
}

function ensureStudentAuthModal() {
    var modal = document.getElementById("student-auth-modal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "student-auth-modal";
    modal.className = "student-auth-modal hidden";
    modal.innerHTML = '<div class="student-auth-backdrop" onclick="closeStudentAuthModal();"></div>' +
        '<div class="student-auth-panel" role="dialog" aria-modal="true" aria-labelledby="student-auth-title">' +
            '<button type="button" class="student-auth-close" onclick="closeStudentAuthModal();" aria-label="Close login popup">×</button>' +
            '<div class="student-auth-content">' +
                '<span class="info-tag">STUDENT LOGIN</span>' +
                '<h3 id="student-auth-title">Student Access</h3>' +
                '<div class="auth-toggle auth-modal-toggle">' +
                    '<button type="button" class="auth-tab active" data-mode="login" onclick="switchStudentAuthModalMode(this.dataset.mode);">लॉगिन</button>' +
                    '<button type="button" class="auth-tab" data-mode="create" onclick="switchStudentAuthModalMode(this.dataset.mode);">Create New Account</button>' +
                '</div>' +
                '<div id="student-modal-login-box" class="auth-box">' +
                    '<form class="student-login" data-auth-flow="login" onsubmit="event.preventDefault(); loginStudentModal(this);">' +
                        '<label><span>यूज़रनाम या ईमेल</span><input type="text" name="username" placeholder="यूज़रनाम या ईमेल" autocomplete="username" required></label>' +
                        '<label><span>पासवर्ड</span><input type="password" name="password" placeholder="पासवर्ड" required></label>' +
                        '<button type="submit">लॉगिन</button>' +
                    '</form>' +
                '</div>' +
                '<div id="student-modal-create-box" class="auth-box hidden">' +
                    '<form class="student-login" data-auth-flow="register" onsubmit="event.preventDefault(); createStudentAccountModal(this);">' +
                        '<label><span>पूरा नाम</span><input type="text" name="name" placeholder="अपना पूरा नाम" required></label>' +
                        '<label><span>यूज़रनाम</span><input type="text" name="username" placeholder="नया यूज़रनाम" required></label>' +
                        '<label><span>पासवर्ड (कम से कम 12 अक्षर)</span><input type="password" name="password" placeholder="नया पासवर्ड" minlength="12" maxlength="128" required></label>' +
                        '<label><span>ईमेल</span><input type="email" name="email" placeholder="name@example.com" autocomplete="email" maxlength="254" required></label>' +
                        authCaptchaMarkup() +
                        '<button type="submit">Create Account</button>' +
                    '</form>' +
                '</div>' +
                '<p id="student-modal-message" class="auth-message"></p>' +
            '</div>' +
        '</div>';
    document.body.appendChild(modal);
    initializeStudentAuthForms(modal);
    return modal;
}

function openStudentAuthModal(messageText, mode) {
    var modal = ensureStudentAuthModal();
    if (!modal) return;

    modal.classList.remove("hidden");
    var messageBox = document.getElementById("student-modal-message");
    if (messageBox) {
        messageBox.textContent = messageText || "";
        messageBox.classList.toggle("show", !!messageText);
    }
    switchStudentAuthModalMode(mode || "login");
}

function closeStudentAuthModal() {
    var modal = document.getElementById("student-auth-modal");
    if (modal) {
        modal.classList.add("hidden");
    }
}

function switchStudentAuthMode(mode) {
    var loginBox = document.getElementById("student-login-box");
    var createBox = document.getElementById("student-create-box");
    var tabs = document.querySelectorAll("#student-auth-card .auth-tab");

    if (!loginBox || !createBox || !tabs.length) return;

    var isLogin = mode === "login";
    loginBox.classList.toggle("hidden", !isLogin);
    createBox.classList.toggle("hidden", isLogin);
    tabs.forEach(function(tab) {
        tab.classList.toggle("active", tab.dataset.mode === mode);
    });
}

function switchStudentAuthModalMode(mode) {
    var loginBox = document.getElementById("student-modal-login-box");
    var createBox = document.getElementById("student-modal-create-box");
    var tabs = document.querySelectorAll(".auth-modal-toggle .auth-tab");

    if (!loginBox || !createBox || !tabs.length) return;

    var isLogin = mode === "login";
    loginBox.classList.toggle("hidden", !isLogin);
    createBox.classList.toggle("hidden", isLogin);
    tabs.forEach(function(tab) {
        tab.classList.toggle("active", tab.dataset.mode === mode);
    });
}

function finishStudentAuth() {
    var nextAction = pendingStudentAction;
    pendingStudentAction = null;
    var currentScrollPosition = window.scrollY;
    closeStudentAuthModal();
    renderHeaderAuthActions();
    if (typeof nextAction === "function") {
        nextAction();
    }
    window.scrollTo(0, currentScrollPosition);
}

function loginStudent(form) {
    submitStudentLogin(form, showStudentAuthMessage);
}

function loginStudentModal(form) {
    submitStudentLogin(form, showStudentModalMessage);
}

function createStudentAccount(form) {
    submitStudentRegistration(form, showStudentAuthMessage);
}

function createStudentAccountModal(form) {
    submitStudentRegistration(form, showStudentModalMessage);
}

function showStudentAuthMessage(message) {
    var messageBox = document.getElementById("student-auth-message");
    if (!messageBox) return;
    messageBox.textContent = message;
    messageBox.classList.add("show");
}

function showStudentModalMessage(message) {
    var messageBox = document.getElementById("student-modal-message");
    if (!messageBox) return;
    messageBox.textContent = message;
    messageBox.classList.add("show");
}

async function logoutStudent() {
    try {
        if (activePractice && !activePractice.completed) {
            await completePracticeTest(false);
        }
        await requestStudentApi("/api/auth/logout", {});
        currentStudent = null;
        renderHome();
        renderHeaderAuthActions();
    } catch (error) {
        console.error("Could not log out the student.", error);
        window.alert("लॉग आउट नहीं हो सका। कृपया कनेक्शन जांचकर फिर कोशिश करें।");
    }
}

function requireStudentLogin(callback) {
    if (!studentAuthReady) {
        if (typeof callback === "function") pendingStudentAction = callback;
        return;
    }
    if (isStudentLoggedIn()) {
        if (typeof callback === "function") {
            callback();
        }
        return;
    }

    if (typeof callback === "function") {
        pendingStudentAction = callback;
    }
    openStudentAuthModal("कृपया लॉगिन करें या नया अकाउंट बनाएं ताकि आप प्रैक्टिस शुरू कर सकें।");
}

function goToMixedQuiz() {
    requireStudentLogin(function() {
        renderHome();
        setTimeout(function() {
            var quizBlock = document.getElementById("quiz");
            if (quizBlock) {
                quizBlock.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 50);
    });
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function(character) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
}

function renderExamCatalogMarkup(searchTerm) {
    var normalizedSearch = String(searchTerm || "").trim().toLocaleLowerCase();
    var visibleGroups = examCatalog.map(function(group, groupIndex) {
        var exams = group.exams.map(function(exam, examIndex) {
            return { name: exam, examIndex: examIndex };
        }).filter(function(exam) {
            return exam.name !== "Current Affairs" &&
                (!normalizedSearch || exam.name.toLocaleLowerCase().indexOf(normalizedSearch) !== -1);
        });
        return { group: group, groupIndex: groupIndex, exams: exams };
    }).filter(function(item) {
        return item.exams.length > 0;
    });
    return '<div class="exam-catalog-grid">' + visibleGroups.map(function(item) {
        var group = item.group;
        return '<details class="catalog-group" open><summary>' + escapeHtml(group.group) + '<span>' + item.exams.length + ' परीक्षाएं</span></summary><ul class="exam-name-list">' +
            item.exams.map(function(exam) {
                return '<li><button type="button" class="exam-name-link" onclick="openExamDetail(' + item.groupIndex + ', ' + exam.examIndex + ')">' + escapeHtml(exam.name) + '<span aria-hidden="true">→</span></button></li>';
            }).join("") +
            '</ul></details>';
    }).join("") + '</div>';
}

function renderSubjectCatalogMarkup() {
    return '<div class="subject-catalog-grid">' + subjectCatalog.map(function(group, groupIndex) {
        return '<details class="subject-group"' + (groupIndex === 0 ? " open" : "") + '><summary>' + escapeHtml(group.group) + '</summary><div class="subject-link-list">' +
            group.subjects.map(function(subject) {
                return '<button type="button" class="subject-link" onclick="loadChapterData(\'' + escapeHtml(subject.chapterId) + '\')">' + escapeHtml(subject.title) + '<span aria-hidden="true">→</span></button>';
            }).join("") +
            '</div></details>';
    }).join("") + '</div>';
}

function renderAppPage(content) {
    var displayArea = document.getElementById("dynamic-content");
    if (!displayArea) return;
    displayArea.innerHTML = '<div class="app-screen">' + content + '</div>';
    renderHeaderAuthActions();
}

function renderExamOptions(selectedExam) {
    return examCatalog.map(function(group) {
        return '<optgroup label="' + escapeHtml(group.group) + '">' + group.exams.map(function(exam) {
            return '<option value="' + escapeHtml(exam) + '"' + (exam === selectedExam ? " selected" : "") + '>' + escapeHtml(exam) + '</option>';
        }).join("") + '</optgroup>';
    }).join("");
}

async function openAdminPanel() {
    renderAppPage('<header class="app-screen-heading"><span class="info-tag">CONTENT ADMIN</span><h1>Content Admin</h1></header><section class="builder-panel"><p>Admin access जाँचा जा रहा है...</p></section>');
    try {
        var result = await requestStudentApi("/api/admin/me");
        if (result.authenticated) {
            renderAdminDashboard();
        } else {
            currentAdmin = false;
            renderHeaderAuthActions();
            renderAdminLogin();
        }
    } catch (error) {
        if (error.status === 401) {
            currentAdmin = false;
            renderHeaderAuthActions();
            renderAdminLogin();
        } else {
            renderAppPage('<header class="app-screen-heading"><span class="info-tag">CONTENT ADMIN</span><h1>Admin उपलब्ध नहीं</h1><p>Server से संपर्क नहीं हो सका। Backend चालू करके फिर कोशिश करें।</p></header>');
        }
    }
}

function renderAdminLogin(message) {
    renderAppPage(
        '<header class="app-screen-heading"><span class="info-tag">ADMIN ONLY</span><h1>Content Admin Login</h1><p>यह editor सिर्फ website owner के लिए है।</p></header>' +
        '<section class="builder-panel admin-login-panel"><form id="admin-login-form" class="admin-content-form">' +
        '<label class="mock-field">Admin username<input name="username" autocomplete="username" required></label>' +
        '<label class="mock-field">Admin password<input name="password" type="password" autocomplete="current-password" required></label>' +
        '<p class="builder-message" id="admin-login-message" aria-live="polite">' + escapeHtml(message || "") + '</p>' +
        '<button class="quiz-action" type="submit">Admin login</button></form></section>'
    );
    document.getElementById("admin-login-form").addEventListener("submit", submitAdminLogin);
}

async function submitAdminLogin(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var message = document.getElementById("admin-login-message");
    try {
        await requestStudentApi("/api/admin/login", {
            username: form.elements.username.value.trim(),
            password: form.elements.password.value
        });
        currentAdmin = true;
        renderHeaderAuthActions();
        renderAdminDashboard();
    } catch (error) {
        if (message) {
            message.textContent = error.status === 429
                ? "बहुत अधिक प्रयास हुए हैं। कुछ देर बाद कोशिश करें।"
                : error.status === 503
                    ? "Admin login चालू नहीं है। Terminal में ADMIN_USERNAME और 16+ अक्षर का ADMIN_PASSWORD सेट करके backend restart करें।"
                : error.status === 401
                    ? "Admin username या password सही नहीं है।"
                    : "Login नहीं हो सका। Backend configuration जाँचें।";
        }
    }
}

function renderAdminDashboard() {
    adminTestQuestions = [];
    var examOptions = renderExamOptions();
    renderAppPage(
        '<header class="app-screen-heading"><span class="info-tag">ADMIN CONTENT EDITOR · PRIVATE</span><h1>Exam content manage करें</h1><p>आपके बदलाव पहले private draft रहेंगे। जाँचने के बाद Publish करें; students को admin tools नहीं दिखते।</p><button class="test-cancel-action" type="button" id="admin-logout-button">Admin logout</button></header>' +
        '<section class="builder-panel admin-editor-panel"><label class="mock-field">परीक्षा चुनें<select id="admin-exam-select">' + examOptions + '</select></label>' +
        '<section class="admin-editor-section"><h2>Syllabus / Topic / Theory / PYQ जोड़ें</h2><form id="admin-content-form" class="admin-content-form">' +
        '<label class="mock-field">कंटेंट का प्रकार<select name="type" id="admin-content-type"><option value="syllabus">Syllabus / Topic</option><option value="theory">Topic-wise Theory</option><option value="pyq">PYQ Question</option></select></label>' +
        '<label class="mock-field">Topic<input name="topic" required maxlength="160" placeholder="जैसे भारतीय संविधान"></label>' +
        '<label class="mock-field">Title / Question<input name="title" required maxlength="200" placeholder="Topic heading या PYQ प्रश्न"></label>' +
        '<label class="mock-field" id="admin-content-label"><span>विवरण</span><textarea name="content" rows="5" maxlength="12000" required placeholder="Syllabus topic या theory notes लिखें"></textarea></label>' +
        '<div id="admin-pyq-fields" class="admin-pyq-fields hidden"><label class="mock-field">विकल्प A<input name="option0"></label><label class="mock-field">विकल्प B<input name="option1"></label><label class="mock-field">विकल्प C<input name="option2"></label><label class="mock-field">विकल्प D<input name="option3"></label><label class="mock-field">सही विकल्प<select name="correctIndex"><option value="0">A</option><option value="1">B</option><option value="2">C</option><option value="3">D</option></select></label><label class="mock-field">व्याख्या<textarea name="explanation" rows="3" maxlength="4000"></textarea></label></div>' +
        '<p class="builder-message" id="admin-content-message" aria-live="polite"></p><button class="quiz-action" type="submit">Content सेव करें</button></form></section>' +
        '<section class="admin-editor-section"><h2>Mock / Full Test जोड़ें</h2><form id="admin-test-form" class="admin-content-form">' +
        '<label class="mock-field">Test type<select name="testType"><option value="mock">Mock test</option><option value="full">Full test (कम-से-कम 25 प्रश्न)</option></select></label>' +
        '<label class="mock-field">Test का नाम<input name="title" required maxlength="200"></label>' +
        '<label class="mock-field">समय (मिनट)<input name="durationMinutes" type="number" min="1" max="1440" value="60" required></label>' +
        '<h3>प्रश्न जोड़ें</h3><label class="mock-field">प्रश्न<input name="question" maxlength="2000"></label>' +
        '<div class="builder-options-grid">' +
        '<label class="mock-field">विकल्प A<input name="option0"></label><label class="mock-field">विकल्प B<input name="option1"></label>' +
        '<label class="mock-field">विकल्प C<input name="option2"></label><label class="mock-field">विकल्प D<input name="option3"></label></div>' +
        '<label class="mock-field">सही विकल्प<select name="correctIndex"><option value="0">A</option><option value="1">B</option><option value="2">C</option><option value="3">D</option></select></label>' +
        '<label class="mock-field">व्याख्या<textarea name="explanation" rows="2" maxlength="4000"></textarea></label>' +
        '<button class="test-cancel-action" id="admin-add-test-question" type="button">प्रश्न जोड़ें</button><ol id="admin-test-question-list" class="builder-question-list"></ol>' +
        '<p class="builder-message" id="admin-test-message" aria-live="polite"></p><button class="quiz-action" type="submit">Test सेव करें</button></form></section>' +
        '<section class="admin-editor-section"><h2>Bulk theory / MCQ import</h2><p>CSV imports private drafts के रूप में आएँगे। PDF से selectable text निकालकर theory draft बनेगी; scanned PDF/OCR supported नहीं है।</p>' +
        '<form id="admin-theory-csv-form" class="admin-content-form"><h3>Theory CSV</h3><p>Headers: topic,title,content · commas वाली values को CSV quotes में रखें।</p><a class="exam-paper-action" download="theory-template.csv" href="data:text/csv;charset=utf-8,topic%2Ctitle%2Ccontent%0AHistory%2CAncient%20India%2C%22Add%20theory%20notes%20here%22">Theory CSV template डाउनलोड करें</a><label class="mock-field">CSV file<input name="file" type="file" accept=".csv,text/csv" required></label><p class="builder-message" id="admin-theory-csv-message" aria-live="polite"></p><button class="quiz-action" type="submit">Theory CSV import करें</button></form>' +
        '<form id="admin-tests-csv-form" class="admin-content-form"><h3>Mock / Full test CSV</h3><p>test_type mock/full; correct_answer A-D; एक title/duration/type की rows एक test बनेंगी। Full test के लिए 25+ questions।</p><a class="exam-paper-action" download="tests-template.csv" href="data:text/csv;charset=utf-8,test_type%2Ctitle%2Cduration_minutes%2Cquestion%2Coption_a%2Coption_b%2Coption_c%2Coption_d%2Ccorrect_answer%2Cexplanation%0Amock%2CHistory%20mock%2C20%2CExample%20question%2COption%20A%2COption%20B%2COption%20C%2COption%20D%2CA%2CExample%20explanation">MCQ CSV template डाउनलोड करें</a><label class="mock-field">CSV file<input name="file" type="file" accept=".csv,text/csv" required></label><p class="builder-message" id="admin-tests-csv-message" aria-live="polite"></p><button class="quiz-action" type="submit">Test CSV import करें</button></form>' +
        '<form id="admin-pdf-theory-form" class="admin-content-form"><h3>PDF text से Theory draft</h3><label class="mock-field">Topic<input name="topic" required maxlength="160"></label><label class="mock-field">Title<input name="title" required maxlength="200"></label><label class="mock-field">Text PDF (अधिकतम 20 MB)<input name="file" type="file" accept="application/pdf,.pdf" required></label><p class="builder-message" id="admin-pdf-theory-message" aria-live="polite"></p><button class="quiz-action" type="submit">PDF से draft बनाएँ</button></form></section>' +
        '<section class="admin-editor-section"><h2>Previous paper PDF जोड़ें</h2><form id="admin-paper-form" class="admin-content-form">' +
        '<label class="mock-field">PDF का नाम<input name="title" required maxlength="200" placeholder="जैसे UPSSSC PET Previous Paper"></label>' +
        '<label class="mock-field">वर्ष<input name="year" type="number" min="1900" max="2099" required></label>' +
        '<label class="mock-field">स्रोत / Channel (वैकल्पिक)<input name="source" maxlength="160" placeholder="आपके channel का नाम"></label>' +
        '<label class="mock-field">PDF file (अधिकतम 20 MB)<input name="file" type="file" accept="application/pdf,.pdf" required></label>' +
        '<p class="builder-message" id="admin-paper-message" aria-live="polite"></p><button class="quiz-action" type="submit">PDF upload करें</button></form></section>' +
        '<section class="admin-editor-section"><h2>Private drafts और प्रकाशित content</h2><button class="quiz-action" type="button" id="admin-publish-drafts">इस परीक्षा के सभी drafts Publish करें</button><div id="admin-saved-content">लोड हो रहा है...</div></section>'
    );

    document.getElementById("admin-logout-button").addEventListener("click", adminLogout);
    document.getElementById("admin-exam-select").addEventListener("change", function() {
        updateAdminContentForm();
        loadAdminSavedContent();
    });
    document.getElementById("admin-content-type").addEventListener("change", updateAdminContentForm);
    document.getElementById("admin-content-form").addEventListener("submit", saveAdminExamContent);
    document.getElementById("admin-add-test-question").addEventListener("click", addAdminTestQuestion);
    document.getElementById("admin-test-form").addEventListener("submit", saveAdminExamTest);
    document.getElementById("admin-paper-form").addEventListener("submit", uploadAdminPreviousPaper);
    document.getElementById("admin-theory-csv-form").addEventListener("submit", function(event) {
        importAdminFile(event, "/api/admin/import/theory-csv", "admin-theory-csv-message", "Theory");
    });
    document.getElementById("admin-tests-csv-form").addEventListener("submit", function(event) {
        importAdminFile(event, "/api/admin/import/tests-csv", "admin-tests-csv-message", "Tests");
    });
    document.getElementById("admin-pdf-theory-form").addEventListener("submit", importAdminPdfTheory);
    document.getElementById("admin-publish-drafts").addEventListener("click", publishAdminDrafts);
    updateAdminContentForm();
    loadAdminSavedContent();
}

async function importAdminFile(event, endpoint, messageId, label) {
    event.preventDefault();
    var form = event.currentTarget;
    var message = document.getElementById(messageId);
    var data = new FormData(form);
    data.append("exam", document.getElementById("admin-exam-select").value);
    try {
        var result = await requestStudentApi(endpoint, data);
        form.reset();
        if (message) message.textContent = result.imported + " " + label + " draft import हुए; publish करने तक students को नहीं दिखेंगे।";
        await loadAdminSavedContent();
    } catch (error) {
        if (message) message.textContent = "Import नहीं हुआ: " + error.message;
    }
}

async function importAdminPdfTheory(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var message = document.getElementById("admin-pdf-theory-message");
    var data = new FormData(form);
    data.append("exam", document.getElementById("admin-exam-select").value);
    try {
        var result = await requestStudentApi("/api/admin/import/pdf-theory", data);
        form.reset();
        if (message) message.textContent = result.characters + " characters का theory draft बना; publish से पहले पढ़कर जाँचें।";
        await loadAdminSavedContent();
    } catch (error) {
        if (message) message.textContent = "PDF import नहीं हुआ: " + error.message;
    }
}

async function publishAdminDrafts() {
    var exam = document.getElementById("admin-exam-select").value;
    try {
        var result = await requestStudentApi("/api/admin/publish", { exam: exam });
        var counts = result.published;
        window.alert("Publish हो गया: " + (counts.exam_content + counts.admin_tests + counts.previous_papers) + " items.");
        await loadAdminSavedContent();
    } catch (error) {
        window.alert("Draft publish नहीं हुए। " + error.message);
    }
}

async function uploadAdminPreviousPaper(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var fileInput = form.elements.file;
    var file = fileInput.files && fileInput.files[0];
    var message = document.getElementById("admin-paper-message");
    if (!file) {
        if (message) message.textContent = "Upload करने के लिए PDF चुनें।";
        return;
    }
    if (file.size > 20 * 1024 * 1024) {
        if (message) message.textContent = "PDF का size 20 MB से कम होना चाहिए।";
        return;
    }
    var data = new FormData();
    data.set("exam", document.getElementById("admin-exam-select").value);
    data.set("title", form.elements.title.value.trim());
    data.set("year", form.elements.year.value);
    data.set("source", form.elements.source.value.trim());
    data.set("file", file);
    try {
        await requestStudentApi("/api/admin/papers", data);
        form.reset();
        if (message) message.textContent = "PDF upload हो गई। यह Previous Papers page पर दिखेगी।";
        await loadAdminSavedContent();
    } catch (error) {
        if (message) message.textContent = "PDF upload नहीं हुई: " + error.message;
    }
}

function updateAdminContentForm() {
    var form = document.getElementById("admin-content-form");
    var pyqFields = document.getElementById("admin-pyq-fields");
    var contentLabel = document.getElementById("admin-content-label");
    if (!form || !pyqFields || !contentLabel) return;
    var isPyq = form.elements.type.value === "pyq";
    var isCurrentAffairs = document.getElementById("admin-exam-select").value === "Current Affairs";
    var pyqOption = form.elements.type.querySelector('option[value="pyq"]');
    if (pyqOption) pyqOption.textContent = isCurrentAffairs ? "One-Liner Question" : "PYQ Question";
    pyqFields.classList.toggle("hidden", !isPyq);
    contentLabel.querySelector("textarea").placeholder = isPyq
        ? (isCurrentAffairs ? "Current Affairs one-liner प्रश्न यहाँ लिखें" : "PYQ प्रश्न यहाँ लिखें")
        : (form.elements.type.value === "theory" ? "इस topic की theory / notes लिखें" : "Syllabus या topic का विवरण लिखें");
    contentLabel.querySelector("span").textContent = isPyq
        ? (isCurrentAffairs ? "One-Liner Question" : "Question text")
        : "विवरण";
    form.elements.content.required = true;
}

async function saveAdminExamContent(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var type = form.elements.type.value;
    var payload = {
        exam: document.getElementById("admin-exam-select").value,
        type: type,
        topic: form.elements.topic.value.trim(),
        title: form.elements.title.value.trim(),
        content: form.elements.content.value.trim()
    };
    if (type === "pyq") {
        payload.options = [0, 1, 2, 3].map(function(index) {
            return form.elements["option" + index].value.trim();
        });
        payload.correctIndex = Number(form.elements.correctIndex.value);
        payload.explanation = form.elements.explanation.value.trim();
    }
    var message = document.getElementById("admin-content-message");
    try {
        await requestStudentApi("/api/admin/exam-content", payload);
        form.reset();
        updateAdminContentForm();
        if (message) message.textContent = "Content सेव हो गया।";
        await loadAdminSavedContent();
    } catch (error) {
        if (message) message.textContent = "Content सेव नहीं हुआ: " + error.message;
    }
}

function addAdminTestQuestion() {
    var form = document.getElementById("admin-test-form");
    var message = document.getElementById("admin-test-message");
    if (!form) return;
    var questionText = form.elements.question.value.trim();
    var options = [0, 1, 2, 3].map(function(index) {
        return form.elements["option" + index].value.trim();
    });
    if (!questionText || options.some(function(option) { return !option; })) {
        if (message) message.textContent = "प्रश्न और चारों विकल्प भरें।";
        return;
    }
    adminTestQuestions.push({
        question: questionText,
        options: options,
        correctIndex: Number(form.elements.correctIndex.value),
        explanation: form.elements.explanation.value.trim()
    });
    form.elements.question.value = "";
    [0, 1, 2, 3].forEach(function(index) { form.elements["option" + index].value = ""; });
    form.elements.explanation.value = "";
    renderAdminTestQuestionList();
    if (message) message.textContent = adminTestQuestions.length + " प्रश्न तैयार हैं।";
}

function renderAdminTestQuestionList() {
    var list = document.getElementById("admin-test-question-list");
    if (!list) return;
    list.innerHTML = adminTestQuestions.map(function(question, index) {
        return '<li><span>प्रश्न ' + (index + 1) + ': ' + escapeHtml(question.question) + '</span><button type="button" data-question-index="' + index + '">हटाएं</button></li>';
    }).join("");
    list.querySelectorAll("button[data-question-index]").forEach(function(button) {
        button.addEventListener("click", function() {
            adminTestQuestions.splice(Number(button.dataset.questionIndex), 1);
            renderAdminTestQuestionList();
        });
    });
}

async function saveAdminExamTest(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var message = document.getElementById("admin-test-message");
    var testType = form.elements.testType.value;
    if (!form.elements.title.value.trim()) {
        if (message) message.textContent = "Test का नाम भरें।";
        return;
    }
    if (testType === "full" && adminTestQuestions.length < 25) {
        if (message) message.textContent = "Full test के लिए कम-से-कम 25 प्रश्न जोड़ें।";
        return;
    }
    if (!adminTestQuestions.length) {
        if (message) message.textContent = "कम-से-कम एक प्रश्न जोड़ें।";
        return;
    }
    try {
        await requestStudentApi("/api/admin/tests", {
            exam: document.getElementById("admin-exam-select").value,
            testType: testType,
            title: form.elements.title.value.trim(),
            durationMinutes: Number(form.elements.durationMinutes.value),
            questions: adminTestQuestions.slice()
        });
        adminTestQuestions = [];
        form.reset();
        form.elements.durationMinutes.value = "60";
        renderAdminTestQuestionList();
        if (message) message.textContent = "Test सेव हो गया।";
        await loadAdminSavedContent();
    } catch (error) {
        if (message) message.textContent = "Test सेव नहीं हुआ: " + error.message;
    }
}

async function loadAdminSavedContent() {
    var container = document.getElementById("admin-saved-content");
    var examSelect = document.getElementById("admin-exam-select");
    if (!container || !examSelect) return;
    var exam = examSelect.value;
    try {
        var responses = await requestStudentApi(
            "/api/admin/content?exam=" + encodeURIComponent(exam)
        );
        var contentMarkup = responses.items.map(function(item) {
            var detail = item.type === "pyq"
                ? '<p>' + escapeHtml(item.content) + '</p><p>सही जवाब: ' + escapeHtml(item.options[item.correctIndex]) + '</p>'
                : '<p class="saved-exam-content">' + escapeHtml(item.content) + '</p>';
            return '<article class="admin-saved-card"><span class="info-tag">' + escapeHtml(item.status.toUpperCase()) + ' · ' + escapeHtml(item.type) + ' · ' + escapeHtml(item.topic) + '</span><h3>' + escapeHtml(item.title) + '</h3>' + detail + '<button class="test-cancel-action" type="button" data-content-id="' + item.id + '">हटाएं</button></article>';
        }).join("");
        var testsMarkup = responses.tests.map(function(test) {
            return '<article class="admin-saved-card"><span class="info-tag">' + escapeHtml(test.status.toUpperCase()) + ' · ' + (test.testType === "full" ? "FULL TEST" : "MOCK TEST") + '</span><h3>' + escapeHtml(test.title) + '</h3><p>' + test.questions.length + ' प्रश्न · ' + test.durationMinutes + ' मिनट</p><button class="test-cancel-action" type="button" data-test-id="' + test.id + '">हटाएं</button></article>';
        }).join("");
        var papersMarkup = responses.papers.map(function(paper) {
            return '<article class="admin-saved-card"><span class="info-tag">' + escapeHtml(paper.status.toUpperCase()) + ' · PREVIOUS PAPER PDF · ' + escapeHtml(paper.year) + '</span><h3>' + escapeHtml(paper.title) + '</h3><p>' + escapeHtml(paper.source || paper.exam) + '</p><a class="exam-paper-action" href="/api/papers/' + paper.id + '/file" target="_blank" rel="noopener">PDF देखें</a><button class="test-cancel-action" type="button" data-paper-id="' + paper.id + '">हटाएं</button></article>';
        }).join("");
        container.innerHTML = (contentMarkup || testsMarkup || papersMarkup)
            ? contentMarkup + testsMarkup + papersMarkup
            : '<p class="empty-state">इस परीक्षा के लिए अभी कोई custom content नहीं जोड़ा गया है।</p>';
        container.querySelectorAll("button[data-content-id]").forEach(function(button) {
            button.addEventListener("click", function() { deleteAdminContent(button.dataset.contentId); });
        });
        container.querySelectorAll("button[data-test-id]").forEach(function(button) {
            button.addEventListener("click", function() { deleteAdminTest(button.dataset.testId); });
        });
        container.querySelectorAll("button[data-paper-id]").forEach(function(button) {
            button.addEventListener("click", function() { deleteAdminPaper(button.dataset.paperId); });
        });
    } catch (error) {
        container.textContent = "Saved content लोड नहीं हुआ।";
    }
}

async function deleteAdminPaper(id) {
    try {
        await requestStudentApi("/api/admin/papers/" + encodeURIComponent(id), null, "DELETE");
        await loadAdminSavedContent();
    } catch (error) {
        window.alert("PDF हटाई नहीं जा सकी। " + error.message);
    }
}

async function deleteAdminContent(id) {
    try {
        await requestStudentApi("/api/admin/exam-content/" + encodeURIComponent(id), null, "DELETE");
        await loadAdminSavedContent();
    } catch (error) {
        window.alert("Content हटाया नहीं जा सका। " + error.message);
    }
}

async function deleteAdminTest(id) {
    try {
        await requestStudentApi("/api/admin/tests/" + encodeURIComponent(id), null, "DELETE");
        await loadAdminSavedContent();
    } catch (error) {
        window.alert("Test हटाया नहीं जा सका। " + error.message);
    }
}

async function adminLogout() {
    try {
        await requestStudentApi("/api/admin/logout", {});
        currentAdmin = false;
        renderHeaderAuthActions();
        renderAdminLogin("Admin logout हो गया।");
    } catch (error) {
        window.alert("Admin logout नहीं हो सका। " + error.message);
    }
}

async function loadExamCustomContent(examName) {
    try {
        var responses = await Promise.all([
            requestStudentApi("/api/exam-content?exam=" + encodeURIComponent(examName)),
            requestStudentApi("/api/exam-tests?exam=" + encodeURIComponent(examName)),
            requestStudentApi("/api/papers?exam=" + encodeURIComponent(examName))
        ]);
        examAdminTests = responses[1].tests;
        var syllabusSection = document.getElementById("exam-syllabus");
        var theorySection = document.getElementById("exam-theory");
        var pyqSection = document.getElementById("exam-pyqs");
        var mockSection = document.getElementById("exam-mocks");
        var fullSection = document.getElementById("exam-full-tests");
        if (!syllabusSection || !theorySection || !pyqSection || !mockSection || !fullSection) return;

        var syllabusItems = responses[0].items.filter(function(item) { return item.type === "syllabus"; });
        var theoryItems = responses[0].items.filter(function(item) { return item.type === "theory"; });
        var pyqItems = responses[0].items.filter(function(item) { return item.type === "pyq"; });
        syllabusSection.insertAdjacentHTML("beforeend", renderExamContentItems(syllabusItems, false));
        theorySection.insertAdjacentHTML("afterbegin", renderExamContentItems(theoryItems, false));
        pyqSection.innerHTML = '<span class="info-tag">PREVIOUS YEAR QUESTIONS</span><h2>पिछले वर्षों के प्रश्न (PYQs)</h2>' +
            (pyqItems.length ? renderExamContentItems(pyqItems, true) : '<p class="empty-state">इस परीक्षा के PYQ अभी admin द्वारा नहीं जोड़े गए हैं।</p>');

        var addedMocks = examAdminTests.filter(function(test) { return test.testType === "mock"; });
        var addedFullTests = examAdminTests.filter(function(test) { return test.testType === "full"; });
        mockSection.insertAdjacentHTML("beforeend", renderSavedExamTestCards(addedMocks));
        fullSection.insertAdjacentHTML("beforeend", renderSavedExamTestCards(addedFullTests));
        var pyqPapers = responses[2].papers;
        pyqSection.insertAdjacentHTML("beforeend", renderPreviousPaperCards(pyqPapers));
    } catch (error) {
        console.error("Could not load exam-specific content.", error);
    }
}

function renderPreviousPaperCards(papers) {
    if (!papers.length) return "";
    return '<section class="exam-paper-library"><h3>इस परीक्षा के Previous Paper PDFs</h3>' +
        papers.map(function(paper) {
            return '<article class="exam-paper-card"><div><span class="info-tag">' + escapeHtml(paper.year) + '</span><h4>' + escapeHtml(paper.title) + '</h4><p>' + escapeHtml(paper.source || paper.exam) + '</p></div><a class="exam-paper-action" href="/api/papers/' + paper.id + '/file" target="_blank" rel="noopener">PDF खोलें ↓</a></article>';
        }).join("") + '</section>';
}

async function openPreviousPapers(examName) {
    var options = '<option value="">सभी परीक्षाएं</option>' + renderExamOptions(examName);
    renderAppPage(
        '<header class="app-screen-heading"><span class="info-tag">PREVIOUS PAPERS</span><h1>Previous Papers और PYQ PDFs</h1><p>Admin द्वारा upload की गई परीक्षा-वार PDF यहाँ देखें या खोलें।</p></header>' +
        '<section class="builder-panel previous-paper-panel"><label class="mock-field">परीक्षा चुनें<select id="previous-paper-exam">' + options + '</select></label>' +
        '<div id="previous-paper-list" class="previous-paper-list" aria-live="polite">PDF papers लोड हो रहे हैं...</div></section>'
    );
    var select = document.getElementById("previous-paper-exam");
    select.addEventListener("change", function() {
        loadPreviousPaperList(select.value);
    });
    loadPreviousPaperList(examName || "");
}

async function loadPreviousPaperList(examName) {
    var container = document.getElementById("previous-paper-list");
    if (!container) return;
    try {
        var query = examName ? "?exam=" + encodeURIComponent(examName) : "";
        var response = await requestStudentApi("/api/papers" + query);
        if (!response.papers.length) {
            container.innerHTML = '<p class="empty-state">अभी कोई Previous Paper PDF upload नहीं हुई है। Admin अपनी PDF यहाँ जोड़ सकता है।</p>';
            return;
        }
        container.innerHTML = response.papers.map(function(paper) {
            return '<article class="exam-paper-card"><div><span class="info-tag">' + escapeHtml(paper.exam) + ' · ' + escapeHtml(paper.year) + '</span><h3>' + escapeHtml(paper.title) + '</h3><p>' + escapeHtml(paper.source || "UP GK Wallah") + '</p></div><div class="exam-paper-actions"><a class="exam-paper-action" href="/api/papers/' + paper.id + '/file" target="_blank" rel="noopener">PDF देखें</a><a class="exam-paper-action" href="/api/papers/' + paper.id + '/file?download=1">Download PDF</a></div></article>';
        }).join("");
    } catch (error) {
        container.textContent = "Previous Papers लोड नहीं हो सके। कृपया backend जाँचें।";
    }
}

function renderExamContentItems(items, isPyq) {
    if (!items.length) return "";
    return '<div class="admin-content-list">' + items.map(function(item) {
        var content = isPyq
            ? '<div class="pyq-options">' + item.options.map(function(option, index) {
                var right = index === item.correctIndex;
                return '<p class="' + (right ? "pyq-correct-option" : "") + '">' + escapeHtml(option) + (right ? ' <strong>✓ सही जवाब</strong>' : '') + '</p>';
            }).join("") + '</div>' + (item.explanation ? '<p><strong>व्याख्या:</strong> ' + escapeHtml(item.explanation) + '</p>' : '')
            : '<p class="saved-exam-content">' + escapeHtml(item.content) + '</p>';
        return '<article class="admin-saved-card"><span class="info-tag">' + escapeHtml(item.topic) + '</span><h3>' + escapeHtml(item.title) + '</h3>' + content + '</article>';
    }).join("") + '</div>';
}

function renderSavedExamTestCards(tests) {
    if (!tests.length) return "";
    return '<div class="test-card-grid">' + tests.map(function(test) {
        var id = Number(test.id.slice(6));
        return '<article class="test-card"><span class="info-tag">' + (test.testType === "full" ? "FULL TEST" : "MOCK TEST") + '</span><h3>' + escapeHtml(test.title) + '</h3><p>' + test.questions.length + ' प्रश्न · ' + test.durationMinutes + ' मिनट</p><button class="quiz-action" type="button" onclick="startSavedExamTest(' + id + ')">टेस्ट शुरू करें</button></article>';
    }).join("") + '</div>';
}

function startSavedExamTest(id) {
    var test = examAdminTests.find(function(item) { return item.id === "admin-" + id; });
    if (test) {
        var practiceTest = Object.assign({}, test, {
            questions: test.questions.map(function(question) {
                return Object.assign({}, question, { q: question.question });
            })
        });
        launchPractice("mock", practiceTest);
    }
}

var globalSearchResults = [];

function normalizeSearchText(value) {
    return String(value || "").replace(/<[^>]*>/g, " ").normalize("NFKC").toLocaleLowerCase();
}

function searchableText(value) {
    if (value === null || value === undefined) return "";
    if (Array.isArray(value)) return value.map(searchableText).join(" ");
    if (typeof value === "object") return Object.keys(value).map(function(key) {
        return searchableText(value[key]);
    }).join(" ");
    return String(value);
}

var bilingualSearchTerms = {
    "india": ["भारत", "भारतीय"],
    "indian": ["भारत", "भारतीय"],
    "भारत": ["india", "indian"],
    "भारतीय": ["india", "indian"],
    "history": ["इतिहास"],
    "इतिहास": ["history"],
    "geography": ["भूगोल"],
    "भूगोल": ["geography"],
    "constitution": ["संविधान"],
    "संविधान": ["constitution"],
    "polity": ["राजव्यवस्था", "राजनीति"],
    "राजव्यवस्था": ["polity", "governance"],
    "governance": ["शासन", "राजव्यवस्था"],
    "economy": ["अर्थव्यवस्था", "आर्थिक"],
    "अर्थव्यवस्था": ["economy"],
    "science": ["विज्ञान"],
    "विज्ञान": ["science"],
    "environment": ["पर्यावरण"],
    "पर्यावरण": ["environment"],
    "culture": ["संस्कृति", "कला"],
    "संस्कृति": ["culture"],
    "sports": ["खेल"],
    "खेल": ["sports"],
    "exam": ["परीक्षा"],
    "परीक्षा": ["exam"],
    "syllabus": ["पाठ्यक्रम", "सिलेबस"],
    "पाठ्यक्रम": ["syllabus"],
    "chapter": ["अध्याय"],
    "अध्याय": ["chapter"],
    "question": ["प्रश्न"],
    "questions": ["प्रश्न"],
    "प्रश्न": ["question", "questions"],
    "prelims": ["प्रारंभिक", "प्रारम्भिक"],
    "preliminary": ["प्रारंभिक", "प्रारम्भिक"],
    "प्रारंभिक": ["prelims", "preliminary"],
    "mains": ["मुख्य परीक्षा"],
    "मुख्य": ["mains"],
    "paper": ["पेपर"],
    "पेपर": ["paper"],
    "current": ["करेंट", "समसामयिक"],
    "affairs": ["अफेयर्स", "समसामयिक"],
    "समसामयिक": ["current", "affairs"]
};

var globalSearchStopWords = {
    "a": true, "an": true, "and": true, "of": true, "the": true, "for": true, "in": true,
    "का": true, "की": true, "के": true, "में": true, "से": true, "और": true, "को": true,
    "पर": true, "है": true
};

function getSearchTerms(query) {
    return normalizeSearchText(query).split(/\s+/).filter(function(term) {
        return term && !globalSearchStopWords[term];
    });
}

function matchesSearchQuery(value, query) {
    var text = normalizeSearchText(searchableText(value));
    return getSearchTerms(query).every(function(term) {
        var aliases = [term].concat(bilingualSearchTerms[term] || []);
        return aliases.some(function(alias) {
            return text.indexOf(alias) !== -1;
        });
    });
}

function searchExcerpt(value, query) {
    var text = searchableText(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    var terms = getSearchTerms(query);
    var matchIndex = normalizeSearchText(text).indexOf(terms[0] || "");
    if (matchIndex < 0) return text.slice(0, 220);
    var start = Math.max(0, matchIndex - 70);
    var end = Math.min(text.length, matchIndex + 150);
    return (start ? "… " : "") + text.slice(start, end) + (end < text.length ? " …" : "");
}

function collectLocalSearchResults(query) {
    var results = [];
    examCatalog.forEach(function(group, groupIndex) {
        group.exams.forEach(function(exam, examIndex) {
            if (matchesSearchQuery([group.group, exam], query)) {
                results.push({
                    kind: exam === "Current Affairs" ? "current-affairs" : "exam",
                    title: exam,
                    subtitle: group.group,
                    detail: "परीक्षा का syllabus, theory, PYQ और tests खोलें।",
                    examName: exam,
                    groupIndex: groupIndex,
                    examIndex: examIndex
                });
            }
        });
    });

    subjectCatalog.forEach(function(group) {
        group.subjects.forEach(function(subject) {
            var chapter = masterStudyDatabase[subject.chapterId];
            if (matchesSearchQuery([group.group, subject.title, chapter], query)) {
                results.push({
                    kind: "chapter",
                    title: (chapter && chapter.title) || subject.title,
                    subtitle: group.group,
                    detail: chapter ? searchExcerpt(chapter, query) : subject.title,
                    chapterId: subject.chapterId,
                    examName: ""
                });
            }
        });
    });

    Object.keys(examSyllabusProfileByName).forEach(function(examName) {
        var profile = examSyllabusBlueprints[examSyllabusProfileByName[examName]];
        if (profile && matchesSearchQuery([examName, profile], query)) {
            results.push({
                kind: "syllabus",
                title: examName + " — सिलेबस",
                subtitle: "परीक्षा पैटर्न और विषयवार syllabus",
                detail: searchExcerpt(profile, query),
                examName: examName,
                section: "exam-syllabus"
            });
        }
    });

    function collectTests(tests, testKind) {
        tests.forEach(function(test) {
            if (!matchesSearchQuery(test, query)) return;
            results.push({
                kind: testKind,
                title: test.title,
                subtitle: test.exam || "सभी परीक्षाएं",
                detail: searchExcerpt(test, query),
                examName: test.exam,
                testId: test.id
            });
        });
    }
    collectTests(mockTestCatalog.concat(getCustomMockTests()), "mock");
    collectTests(liveTestCatalog, "live");

    return results;
}

function renderGlobalSearchResults(results, query, serverError) {
    var content = results.length
        ? '<div class="global-search-results">' + results.map(function(result, index) {
            return '<article class="global-search-result"><span class="info-tag">' + escapeHtml(result.subtitle) + '</span>' +
                '<h2>' + escapeHtml(result.title) + '</h2><p>' + escapeHtml(result.detail) + '</p>' +
                (result.paperId
                    ? '<a class="exam-paper-action" href="/api/papers/' + result.paperId + '/file" target="_blank" rel="noopener">PDF खोलें →</a>'
                    : '<button class="quiz-action" type="button" onclick="openGlobalSearchResult(' + index + ')">खोलें →</button>') +
                '</article>';
        }).join("") + '</div>'
        : '<p class="empty-state">“' + escapeHtml(query) + '” के लिए कोई matching सामग्री नहीं मिली। हिंदी या English में दूसरा शब्द आज़माएँ।</p>';
    var errorMessage = serverError
        ? '<p class="search-error" role="alert">Admin द्वारा जोड़ा गया content खोजा नहीं जा सका। Backend जाँचें; नई search API के लिए server restart करना पड़ सकता है।</p>'
        : "";
    renderAppPage('<header class="app-screen-heading"><span class="info-tag">WEBSITE SEARCH</span><h1>खोज परिणाम</h1>' +
        '<p>“' + escapeHtml(query) + '” के लिए ' + results.length + ' परिणाम मिले।</p></header>' +
        errorMessage + '<section class="global-search-section" aria-live="polite">' + content + '</section>');
}

function openGlobalSearchResult(index) {
    var result = globalSearchResults[index];
    if (!result) return;
    if (result.kind === "current-affairs" || result.examName === "Current Affairs") {
        openCurrentAffairs();
    } else if (result.chapterId) {
        loadChapterData(result.chapterId);
    } else if (result.examName && result.groupIndex !== undefined) {
        openExamDetail(result.groupIndex, result.examIndex);
    } else if (result.examName && result.examName !== "सभी परीक्षाएं") {
        var examLocation;
        examCatalog.some(function(group, groupIndex) {
            var examIndex = group.exams.indexOf(result.examName);
            if (examIndex !== -1) {
                examLocation = { groupIndex: groupIndex, examIndex: examIndex };
                return true;
            }
            return false;
        });
        if (examLocation) {
            openExamDetail(examLocation.groupIndex, examLocation.examIndex);
            setTimeout(function() {
                var section = document.getElementById(result.section || (result.kind === "pyq" ? "exam-pyqs" : "exam-syllabus"));
                if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 50);
        } else if (result.kind === "live") {
            openLiveTests();
        } else {
            openMockTests();
        }
    } else if (result.kind === "live") {
        openLiveTests();
    } else {
        openMockTests();
    }
}

async function searchExams(searchTerm) {
    var rawQuery = String(searchTerm || "").trim();
    var query = getSearchTerms(rawQuery).join(" ");
    if (!query) {
        showSearchQueryMessage("कुछ खोजने के लिए परीक्षा, विषय या प्रश्न का नाम लिखें।");
        return;
    }
    globalSearchResults = collectLocalSearchResults(query);
    renderAppPage('<header class="app-screen-heading"><span class="info-tag">WEBSITE SEARCH</span><h1>खोज परिणाम</h1><p>“' + escapeHtml(rawQuery) + '” के लिए साइट की सामग्री खोजी जा रही है...</p></header>' +
        '<section class="global-search-section" aria-live="polite"><p class="empty-state">परीक्षा, अध्याय, syllabus, प्रश्न और notes खोजे जा रहे हैं...</p></section>');
    var serverError = false;
    try {
        var response = await requestStudentApi("/api/search?q=" + encodeURIComponent(query));
        response.content.forEach(function(item) {
            globalSearchResults.push({
                kind: item.type === "pyq" ? "pyq" : item.type,
                title: item.title || item.content,
                subtitle: item.exam + " · " + item.topic,
                detail: [item.content].concat(item.options || [], item.explanation || []).filter(Boolean).join(" · "),
                examName: item.exam,
                section: item.type === "theory" ? "exam-theory" : item.type === "pyq" ? "exam-pyqs" : "exam-syllabus"
            });
        });
        response.tests.forEach(function(test) {
            globalSearchResults.push({
                kind: test.type === "full" ? "full" : "mock",
                title: test.title,
                subtitle: test.exam,
                detail: test.matchText || test.questionCount + " प्रश्न",
                examName: test.exam,
                section: test.type === "full" ? "exam-full-tests" : "exam-mocks"
            });
        });
        response.papers.forEach(function(paper) {
            globalSearchResults.push({
                kind: "paper",
                title: paper.title,
                subtitle: paper.exam + " · " + paper.year,
                detail: paper.source || "Previous Paper PDF",
                paperId: paper.id
            });
        });
    } catch (error) {
        console.error("Could not search saved website content.", error);
        serverError = true;
    }
    renderGlobalSearchResults(globalSearchResults, rawQuery, serverError);
}

function showSearchQueryMessage(message) {
    globalSearchResults = [];
    renderAppPage('<header class="app-screen-heading"><span class="info-tag">WEBSITE SEARCH</span><h1>खोज</h1></header>' +
        '<section class="global-search-section"><p class="empty-state">' + escapeHtml(message) + '</p></section>');
}

function showExamCatalog(searchTerm) {
    var query = String(searchTerm || "").trim();
    var resultMessage = query
        ? '<p class="exam-content-note">“' + escapeHtml(query) + '” के लिए परीक्षा खोज परिणाम।</p>'
        : "";
    var catalogMarkup = renderExamCatalogMarkup(query);
    if (!catalogMarkup.replace(/<[^>]*>/g, "").trim()) {
        catalogMarkup = '<p class="empty-state">इस नाम से कोई परीक्षा नहीं मिली। नाम की spelling जाँचकर दोबारा खोजें।</p>';
    }
    renderAppPage('<header class="app-screen-heading"><span class="info-tag">EXAM CATALOG</span><h1>सभी परीक्षाएं</h1><p>UP सरकारी, SSC और Railway परीक्षाओं की सूची।</p></header>' +
        '<section class="exam-section" id="exams">' + resultMessage + catalogMarkup + '</section>' +
        '<section class="subject-section"><h2>विषयवार सूची</h2>' + renderSubjectCatalogMarkup() + '</section>');
}

async function openCurrentAffairs() {
    renderAppPage(
        '<header class="app-screen-heading"><span class="info-tag">CURRENT AFFAIRS</span><h1>करेंट अफेयर्स One-Liner प्रश्न</h1><p>प्रश्न पढ़ें और बटन दबाकर सही उत्तर व संक्षिप्त व्याख्या देखें।</p></header>' +
        '<section id="current-affairs-questions" class="admin-content-list" aria-live="polite"><p class="empty-state">करेंट अफेयर्स प्रश्न लोड हो रहे हैं...</p></section>'
    );
    var container = document.getElementById("current-affairs-questions");
    if (!container) return;

    try {
        var response = await requestStudentApi("/api/exam-content?exam=" + encodeURIComponent("Current Affairs"));
        var questions = response.items.filter(function(item) {
            return item.type === "pyq" && Array.isArray(item.options) && item.options.length > item.correctIndex;
        });
        if (!questions.length) {
            container.innerHTML = '<p class="empty-state">अभी Current Affairs one-liner प्रश्न नहीं जोड़े गए हैं। Admin login करके परीक्षा “Current Affairs” चुनें और “One-Liner Question” के रूप में प्रश्न जोड़ें।</p>';
            return;
        }

        container.innerHTML = questions.map(function(item, index) {
            var answerId = "current-affairs-answer-" + item.id;
            var question = item.content || item.title;
            var correctAnswer = item.options[item.correctIndex];
            return '<article class="admin-saved-card current-affairs-question"><span class="info-tag">ONE-LINER · ' + (index + 1) + '</span>' +
                '<h2>' + escapeHtml(question) + '</h2><button class="quiz-action" type="button" aria-controls="' + answerId + '" onclick="showBlockBox(\'' + answerId + '\')">उत्तर देखें</button>' +
                '<div id="' + answerId + '" class="current-affairs-answer" style="display: none;"><p><strong>उत्तर:</strong> ' + escapeHtml(correctAnswer) + '</p>' +
                (item.explanation ? '<p><strong>संक्षिप्त जानकारी:</strong> ' + escapeHtml(item.explanation) + '</p>' : '') + '</div></article>';
        }).join("");
    } catch (error) {
        console.error("Could not load current affairs one-liners.", error);
        container.textContent = "करेंट अफेयर्स प्रश्न लोड नहीं हो सके। कृपया इंटरनेट और backend connection जाँचें।";
    }
}

function getExamCatalogTests(examName) {
    return mockTestCatalog.concat(getCustomMockTests()).filter(function(test) {
        return test.exam === examName || test.exam === "सभी परीक्षाएं";
    });
}

function renderExamTestCards(tests, emptyMessage) {
    if (!tests.length) return '<p class="empty-state">' + escapeHtml(emptyMessage) + '</p>';
    return '<div class="test-card-grid">' + tests.map(function(test) {
        return '<article class="test-card"><span class="info-tag">' + escapeHtml(test.exam) + '</span><h3>' + escapeHtml(test.title) + '</h3><p>' + test.questions.length + ' प्रश्न · ' + (test.durationMinutes || 10) + ' मिनट</p><button class="quiz-action" type="button" onclick="startMockTest(\'' + escapeHtml(test.id) + '\')">टेस्ट शुरू करें</button></article>';
    }).join("") + '</div>';
}

function renderExamSyllabus(examName, fallbackMarkup) {
    var profileName = examSyllabusProfileByName[examName];
    var blueprint = profileName && examSyllabusBlueprints[profileName];
    if (!blueprint) return fallbackMarkup;

    return '<div class="exam-syllabus-content"><p class="exam-content-note"><strong>परीक्षा पैटर्न:</strong> ' + escapeHtml(blueprint.pattern) + '</p>' +
        '<p class="exam-syllabus-caveat">यह latest-known तैयारी रूपरेखा है; आधिकारिक 2026 अधिसूचना से स्वतंत्र रूप से सत्यापित नहीं। अंतिम पाठ्यक्रम, अंक, पात्रता और चयन चरण संबंधित भर्ती संस्था के नवीनतम विज्ञापन से मिलाएं।</p>' +
        '<div class="exam-syllabus-grid">' + blueprint.sections.map(function(section) {
            return '<article class="exam-syllabus-card"><h3>' + escapeHtml(section[0]) + '</h3><ul>' +
                section[1].map(function(topic) {
                    return '<li>' + escapeHtml(topic) + '</li>';
                }).join("") + '</ul></article>';
        }).join("") + '</div></div>';
}

function openExamDetail(groupIndex, examIndex) {
    var group = examCatalog[groupIndex];
    var examName = group && group.exams[examIndex];
    if (!examName) return;

    var subjectsMarkup = '<div class="exam-subject-groups">' + subjectCatalog.map(function(subjectGroup, subjectGroupIndex) {
        return '<details class="subject-group"' + (subjectGroupIndex === 0 ? " open" : "") + '><summary>' + escapeHtml(subjectGroup.group) + '</summary><div class="subject-link-list">' +
            subjectGroup.subjects.map(function(subject) {
                return '<button type="button" class="subject-link" onclick="loadChapterData(\'' + escapeHtml(subject.chapterId) + '\')">' + escapeHtml(subject.title) + '<span aria-hidden="true">थ्योरी →</span></button>';
            }).join("") + '</div></details>';
    }).join("") + '</div>';

    var examTests = getExamCatalogTests(examName);
    var fullTests = examTests.filter(function(test) { return test.questions.length >= 25; });
    var commonTests = examTests.filter(function(test) { return test.questions.length < 25; });
    var syllabusMarkup = renderExamSyllabus(examName, '<p class="exam-content-note">नीचे वेबसाइट में उपलब्ध विषय और अध्याय दिए गए हैं। ये अभी इस परीक्षा का आधिकारिक, परीक्षा-विशिष्ट सिलेबस नहीं हैं।</p>' + subjectsMarkup);
    var sectionLinks = [
        ["exam-syllabus", "सिलेबस"],
        ["exam-theory", "विषयवार थ्योरी"],
        ["exam-mocks", "मॉक टेस्ट"],
        ["exam-pyqs", "PYQs"],
        ["exam-full-tests", "फुल टेस्ट"]
    ];

    renderAppPage(
        '<header class="app-screen-heading"><span class="info-tag">' + escapeHtml(group.group) + '</span><h1>' + escapeHtml(examName) + '</h1><p>इस परीक्षा की तैयारी के लिए उपलब्ध विषय, थ्योरी और टेस्ट सामग्री।</p><button type="button" class="exam-back-button" onclick="showExamCatalog()">← सभी परीक्षाएं</button></header>' +
        '<nav class="exam-section-nav" aria-label="परीक्षा तैयारी सेक्शन">' + sectionLinks.map(function(section) {
            return '<a href="#' + section[0] + '">' + section[1] + '</a>';
        }).join("") + '</nav>' +
        '<section class="exam-detail-section" id="exam-syllabus"><span class="info-tag">SYLLABUS / TOPICS</span><h2>सिलेबस और विषय</h2>' + syllabusMarkup + '</section>' +
        '<section class="exam-detail-section" id="exam-theory"><span class="info-tag">SUBJECT-WISE THEORY</span><h2>विषयवार थ्योरी</h2><p class="exam-content-note">किसी अध्याय को खोलकर उसकी थ्योरी और अभ्यास प्रश्न पढ़ें।</p>' + subjectsMarkup + '</section>' +
        '<section class="exam-detail-section" id="exam-mocks"><span class="info-tag">MOCK TESTS</span><h2>मॉक टेस्ट</h2><p class="exam-content-note">यहाँ परीक्षा के नाम से टैग किए गए टेस्ट और सभी परीक्षाओं के लिए सामान्य अभ्यास टेस्ट दिखते हैं।</p>' + renderExamTestCards(commonTests, "इस परीक्षा के लिए कोई छोटा/सामान्य मॉक टेस्ट उपलब्ध नहीं है।") + '</section>' +
        '<section class="exam-detail-section" id="exam-pyqs"><span class="info-tag">PREVIOUS YEAR QUESTIONS</span><h2>पिछले वर्षों के प्रश्न (PYQs)</h2><p class="empty-state">इस परीक्षा के PYQ प्रश्न अभी वेबसाइट में उपलब्ध नहीं हैं। वास्तविक पिछले वर्ष के प्रश्न जोड़े जाने के बाद वे यहाँ दिखेंगे।</p></section>' +
        '<section class="exam-detail-section" id="exam-full-tests"><span class="info-tag">FULL TESTS</span><h2>फुल टेस्ट</h2><p class="exam-content-note">यहाँ उपलब्ध प्रश्न-बैंक में 25 या अधिक प्रश्न वाले टेस्ट दिखाए गए हैं।</p>' + renderExamTestCards(fullTests, "इस परीक्षा के लिए अभी 25 या अधिक प्रश्न वाला फुल टेस्ट उपलब्ध नहीं है।") + '</section>'
    );
    loadExamCustomContent(examName);
}

function getCustomMockTests() {
    try {
        var savedTests = JSON.parse(localStorage.getItem("upgk_custom_mock_tests") || "[]");
        return Array.isArray(savedTests) ? savedTests : [];
    } catch (error) {
        return [];
    }
}

function renderMockTestCards() {
    var tests = mockTestCatalog.concat(getCustomMockTests());
    if (!tests.length) return '<p class="empty-state">अभी कोई मॉक टेस्ट नहीं है। नीचे नया टेस्ट बनाएं।</p>';

    return '<div class="test-card-grid">' + tests.map(function(test) {
        return '<article class="test-card"><span class="info-tag">' + escapeHtml(test.exam) + '</span><h3>' + escapeHtml(test.title) + '</h3><p>' + test.questions.length + ' प्रश्न · ' + (test.durationMinutes || 10) + ' मिनट</p><button class="quiz-action" type="button" onclick="startMockTest(\'' + escapeHtml(test.id) + '\')">मॉक टेस्ट शुरू करें</button></article>';
    }).join("") + '</div>';
}

function renderMockTests() {
    mockBuilderQuestions = [];
    var examOptions = examCatalog.map(function(group) {
        return '<optgroup label="' + escapeHtml(group.group) + '">' + group.exams.map(function(exam) {
            return '<option value="' + escapeHtml(exam) + '">' + escapeHtml(exam) + '</option>';
        }).join("") + '</optgroup>';
    }).join("");

    renderAppPage('<header class="app-screen-heading"><span class="info-tag">MOCK TESTS</span><h1>मॉक टेस्ट लाइब्रेरी</h1><p>तैयार टेस्ट हल करें या अपने प्रश्नों से नया मॉक टेस्ट बनाएं।</p></header>' +
        '<section class="test-library"><h2>उपलब्ध मॉक टेस्ट</h2><div id="mock-test-list">' + renderMockTestCards() + '</div></section>' +
        '<section class="test-history"><h2>आपके पिछले मॉक टेस्ट</h2><div id="mock-test-history" aria-live="polite">रिजल्ट लोड हो रहे हैं...</div></section>' +
        '<section class="builder-panel"><header><span class="info-tag">TEST BUILDER</span><h2>अपना मॉक टेस्ट बनाएं</h2></header>' +
        '<form id="mock-builder-form" onsubmit="saveCustomMockTest(event); return false;">' +
            '<div class="builder-meta-grid"><label class="mock-field">टेस्ट का नाम<input name="title" required maxlength="80" placeholder="जैसे UP GK Practice Set 1"></label><label class="mock-field">परीक्षा<select name="exam" required>' + examOptions + '</select></label></div>' +
            '<label class="mock-field">प्रश्न<textarea name="question" rows="2" placeholder="अपना सवाल लिखें"></textarea></label>' +
            '<div class="builder-options-grid">' +
                '<label class="mock-field">विकल्प A<input name="option0"></label>' +
                '<label class="mock-field">विकल्प B<input name="option1"></label>' +
                '<label class="mock-field">विकल्प C<input name="option2"></label>' +
                '<label class="mock-field">विकल्प D<input name="option3"></label>' +
            '</div>' +
            '<div class="builder-actions"><label class="mock-field">सही विकल्प<select name="correctIndex"><option value="0">A</option><option value="1">B</option><option value="2">C</option><option value="3">D</option></select></label><button class="quiz-action" type="button" onclick="addMockBuilderQuestion()">प्रश्न जोड़ें</button></div>' +
            '<ol id="mock-builder-question-list" class="builder-question-list"></ol><p id="mock-builder-message" class="builder-message" aria-live="polite"></p>' +
            '<button class="header-logout builder-save" type="submit">मॉक टेस्ट सेव करें</button>' +
        '</form></section>');
    loadTestResultHistory("mock", "mock-test-history");
}

function openMockTests() {
    requireStudentLogin(renderMockTests);
}

function addMockBuilderQuestion() {
    var form = document.getElementById("mock-builder-form");
    var message = document.getElementById("mock-builder-message");
    if (!form || !message) return;

    var questionText = form.elements.question.value.trim();
    var options = [0, 1, 2, 3].map(function(index) {
        return form.elements["option" + index].value.trim();
    });
    if (!questionText || options.some(function(option) { return !option; })) {
        message.textContent = "प्रश्न और चारों विकल्प भरें।";
        return;
    }

    mockBuilderQuestions.push({
        q: questionText,
        options: options,
        correctIndex: Number(form.elements.correctIndex.value),
        explanation: ""
    });
    form.elements.question.value = "";
    [0, 1, 2, 3].forEach(function(index) {
        form.elements["option" + index].value = "";
    });
    message.textContent = "प्रश्न जोड़ दिया गया। अब अगला प्रश्न भरें या टेस्ट सेव करें।";
    renderMockBuilderQuestionList();
}

function renderMockBuilderQuestionList() {
    var list = document.getElementById("mock-builder-question-list");
    if (!list) return;
    list.innerHTML = mockBuilderQuestions.map(function(question, index) {
        return '<li><span>प्रश्न ' + (index + 1) + ': ' + escapeHtml(question.q) + '</span><button type="button" aria-label="प्रश्न हटाएं" onclick="removeMockBuilderQuestion(' + index + ')">हटाएं</button></li>';
    }).join("");
}

function removeMockBuilderQuestion(index) {
    mockBuilderQuestions.splice(index, 1);
    renderMockBuilderQuestionList();
}

function saveCustomMockTest(event) {
    event.preventDefault();
    var form = document.getElementById("mock-builder-form");
    var message = document.getElementById("mock-builder-message");
    if (!form || !message) return;
    if (!form.elements.title.value.trim()) {
        message.textContent = "मॉक टेस्ट का नाम भरें।";
        return;
    }
    if (!mockBuilderQuestions.length) {
        message.textContent = "टेस्ट सेव करने से पहले कम से कम एक प्रश्न जोड़ें।";
        return;
    }

    var tests = getCustomMockTests();
    tests.push({
        id: "custom-" + Date.now(),
        title: form.elements.title.value.trim(),
        exam: form.elements.exam.value,
        durationMinutes: 20,
        questions: mockBuilderQuestions.slice()
    });
    localStorage.setItem("upgk_custom_mock_tests", JSON.stringify(tests));
    renderMockTests();
}

function renderLiveTestCards() {
    return '<div class="test-card-grid">' + liveTestCatalog.map(function(test) {
        return '<article class="test-card live-test-card"><span class="live-status">● ' + escapeHtml(test.schedule) + '</span><h3>' + escapeHtml(test.title) + '</h3><p>' + escapeHtml(test.exam) + ' · ' + test.questions.length + ' प्रश्न · ' + test.durationMinutes + ' मिनट</p><button class="quiz-action" type="button" onclick="startLiveTest(\'' + escapeHtml(test.id) + '\')">लाइव टेस्ट शुरू करें</button></article>';
    }).join("") + '</div>';
}

function openLiveTests() {
    requireStudentLogin(function() {
        renderAppPage('<header class="app-screen-heading"><span class="info-tag">LIVE TESTS</span><h1>लाइव टेस्ट</h1><p>लाइव टेस्ट के प्रश्न live-tests-data.js में अलग से जोड़ें।</p></header><section class="test-library">' + renderLiveTestCards() + '</section><section class="test-history"><h2>आपके पिछले लाइव टेस्ट</h2><div id="live-test-history" aria-live="polite">रिजल्ट लोड हो रहे हैं...</div></section>');
        loadTestResultHistory("live", "live-test-history");
    });
}

function startMockTest(testId) {
    requireStudentLogin(function() {
        var test = mockTestCatalog.concat(getCustomMockTests()).find(function(item) { return item.id === testId; });
        if (test) launchPractice("mock", test);
    });
}

function startLiveTest(testId) {
    requireStudentLogin(function() {
        var test = liveTestCatalog.find(function(item) { return item.id === testId; });
        if (test) launchPractice("live", test);
    });
}

function launchPractice(kind, test) {
    if (activePractice && !activePractice.completed) {
        completePracticeTest(false);
        activePractice = null;
    }
    var durationMinutes = Number(test.durationMinutes) || 10;
    durationMinutes = Math.max(1, Math.min(durationMinutes, 24 * 60));
    pendingPractice = { kind: kind, test: test, durationMinutes: durationMinutes };
    renderAppPage(
        '<header class="app-screen-heading"><span class="info-tag">' +
        (kind === "live" ? "LIVE TEST" : "MOCK TEST") +
        '</span><h1>' + escapeHtml(test.title) + '</h1><p>' + escapeHtml(test.exam) +
        ' · ' + test.questions.length + ' प्रश्न · ' + durationMinutes +
        ' मिनट</p></header><section class="quiz-card test-start-card"><div class="test-start-content">' +
        '<span class="test-start-icon" aria-hidden="true">◷</span><h2>टेस्ट शुरू करने के लिए तैयार हैं?</h2>' +
        '<p>शुरू करने पर timer चालू हो जाएगा। समय पूरा होने पर टेस्ट अपने-आप submit हो जाएगा।</p>' +
        '<div class="test-start-actions"><button class="quiz-action" type="button" onclick="beginPracticeTest()">हाँ, टेस्ट शुरू करें</button>' +
        '<button class="test-cancel-action" type="button" onclick="cancelPracticeStart()">अभी नहीं</button></div>' +
        '</div></section>'
    );
}

function cancelPracticeStart() {
    if (!pendingPractice) return;
    var kind = pendingPractice.kind;
    pendingPractice = null;
    if (kind === "live") {
        openLiveTests();
    } else {
        openMockTests();
    }
}

function beginPracticeTest() {
    if (!pendingPractice) return;
    var kind = pendingPractice.kind;
    var test = pendingPractice.test;
    var durationMinutes = pendingPractice.durationMinutes;
    pendingPractice = null;
    activePractice = {
        kind: kind,
        test: test,
        index: 0,
        score: 0,
        answered: false,
        selectedIndex: -1,
        selectedAnswers: Array(test.questions.length).fill(null),
        startedAt: Date.now(),
        deadlineAt: Date.now() + durationMinutes * 60 * 1000,
        timerId: null,
        completed: false,
        result: null
    };
    renderAppPage('<header class="app-screen-heading"><span class="info-tag">' + (kind === "live" ? "LIVE TEST" : "MOCK TEST") + '</span><h1>' + escapeHtml(test.title) + '</h1><p>' + escapeHtml(test.exam) + ' · ' + (test.durationMinutes || 10) + ' मिनट</p></header><section class="quiz-card"><div class="quiz-body protected-copy" id="practice-stage" aria-live="polite"></div></section>');
    renderPracticeQuestion();
    activePractice.timerId = window.setInterval(updatePracticeTimer, 1000);
    updatePracticeTimer();
}

function renderPracticeQuestion() {
    var stage = document.getElementById("practice-stage");
    if (!stage || !activePractice) return;
    var questions = activePractice.test.questions;
    if (activePractice.index >= questions.length) {
        completePracticeTest(false);
        return;
    }

    var question = questions[activePractice.index];
    var html = '<div class="practice-status-row"><div class="quiz-progress-row"><span>प्रश्न ' + (activePractice.index + 1) + ' / ' + questions.length + '</span><span>सही जवाब: ' + activePractice.score + '</span></div><div class="practice-timer-watch"><div class="timer-watch-face" id="timer-watch-face"><span class="timer-watch-hand" aria-hidden="true"></span><strong class="practice-timer" id="practice-timer" role="timer" aria-label="शेष समय">--:--</strong><span class="timer-caption">शेष समय</span></div></div></div><div class="quiz-progress-track"><div class="quiz-progress-fill" style="width:' + Math.round((activePractice.index / questions.length) * 100) + '%"></div></div><h2 class="quiz-question">' + escapeHtml(question.q) + '</h2><div class="options-grid">';
    question.options.forEach(function(option, optionIndex) {
        var stateClass = activePractice.answered && optionIndex === question.correctIndex ? " correct-pick" : "";
        if (activePractice.answered && optionIndex === activePractice.selectedIndex && optionIndex !== question.correctIndex) stateClass = " wrong-pick";
        html += '<button class="opt-btn' + stateClass + '" type="button" onclick="selectPracticeAnswer(' + optionIndex + ')"' + (activePractice.answered ? " disabled" : "") + '>' + escapeHtml(option) + '</button>';
    });
    if (activePractice.answered) {
        html += '<div class="quiz-feedback' + (activePractice.selectedIndex === question.correctIndex ? "" : " is-wrong") + '">' + escapeHtml(question.explanation || "उत्तर दर्ज हो गया।") + '</div>';
    }
    html += '<div class="quiz-footer"><span class="quiz-score-live">' + (activePractice.answered ? "उत्तर दर्ज हो गया" : "एक विकल्प चुनें") + '</span><button class="quiz-action" type="button" onclick="nextPracticeQuestion()"' + (activePractice.answered ? "" : " disabled") + '>' + (activePractice.index === questions.length - 1 ? "नतीजा देखें" : "अगला सवाल") + '</button></div>';
    stage.innerHTML = html;
    updatePracticeTimer();
}

function updatePracticeTimer() {
    if (!activePractice || activePractice.completed) return;
    var remainingSeconds = Math.max(0, Math.ceil((activePractice.deadlineAt - Date.now()) / 1000));
    var timer = document.getElementById("practice-timer");
    if (timer) {
        var minutes = Math.floor(remainingSeconds / 60);
        var seconds = remainingSeconds % 60;
        timer.textContent = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
        timer.classList.toggle("is-low-time", remainingSeconds <= 60);
        var face = document.getElementById("timer-watch-face");
        if (face) {
            var totalSeconds = Math.max(1, Math.ceil((activePractice.deadlineAt - activePractice.startedAt) / 1000));
            var remainingProgress = Math.max(0, Math.min(1, remainingSeconds / totalSeconds));
            face.style.setProperty("--timer-progress", remainingProgress);
            face.classList.toggle("is-low-time", remainingSeconds <= 60);
        }
    }
    if (remainingSeconds <= 0) {
        completePracticeTest(true);
    }
}

function practiceResultFromAttempt(attempt) {
    return {
        id: null,
        kind: attempt.kind,
        testId: attempt.test.id,
        title: attempt.test.title,
        exam: attempt.test.exam,
        score: attempt.score,
        total: attempt.test.questions.length,
        durationSeconds: Math.max(0, Math.floor((Date.now() - attempt.startedAt) / 1000)),
        timedOut: attempt.timedOut,
        createdAt: Math.floor(Date.now() / 1000),
        answers: attempt.test.questions.map(function(question, index) {
            return {
                question: question.q,
                options: question.options,
                correctIndex: question.correctIndex,
                selectedIndex: attempt.selectedAnswers[index],
                explanation: question.explanation || ""
            };
        })
    };
}

async function completePracticeTest(timedOut) {
    if (!activePractice || activePractice.completed) return;
    var attempt = activePractice;
    attempt.completed = true;
    attempt.timedOut = timedOut;
    if (attempt.timerId) {
        window.clearInterval(attempt.timerId);
        attempt.timerId = null;
    }
    attempt.result = practiceResultFromAttempt(attempt);
    renderPracticeResult(attempt.result, "रिजल्ट सेव हो रहा है...");

    try {
        var response = await requestStudentApi("/api/results", {
            kind: attempt.result.kind,
            testId: attempt.result.testId,
            title: attempt.result.title,
            exam: attempt.result.exam,
            durationSeconds: attempt.result.durationSeconds,
            timedOut: attempt.result.timedOut,
            answers: attempt.result.answers
        });
        if (activePractice === attempt) {
            attempt.result.id = response.result.id;
            attempt.result.createdAt = response.result.createdAt;
            renderPracticeResult(attempt.result, "रिजल्ट आपके अकाउंट में सेव हो गया।");
        }
    } catch (error) {
        if (activePractice === attempt) {
            renderPracticeResult(attempt.result, "रिजल्ट सेव नहीं हो सका: " + error.message + "। इंटरनेट जांचें; रिजल्ट आपके अकाउंट में सेव नहीं हुआ है।");
        }
    }
}

function renderPracticeResult(result, saveStatus) {
    var stage = document.getElementById("practice-stage");
    if (!stage || !result) return;
    var total = result.total || result.answers.length;
    var score = result.score;
    var percentage = total ? Math.round((score / total) * 100) : 0;
    var wrong = result.answers.filter(function(answer) {
        return answer.selectedIndex !== null && answer.selectedIndex !== answer.correctIndex;
    }).length;
    var skipped = total - score - wrong;
    var correctWidth = total ? (score / total) * 100 : 0;
    var wrongWidth = total ? (wrong / total) * 100 : 0;
    var skippedWidth = total ? (skipped / total) * 100 : 0;
    var html = '<div class="quiz-result"><span class="quiz-kicker">' + (result.timedOut ? "समय पूरा — टेस्ट ऑटो-सबमिट हुआ" : "टेस्ट पूरा हुआ") + '</span><h2>' + escapeHtml(result.title) + '</h2><strong class="quiz-result-score">' + score + ' / ' + total + '</strong><p class="result-percentage">स्कोर: ' + percentage + '%</p><p>सही: ' + score + ' · गलत: ' + wrong + ' · बिना जवाब: ' + skipped + '</p><p>समय: ' + formatTestDuration(result.durationSeconds) + '</p><div class="result-chart" role="img" aria-label="स्कोर चार्ट: सही ' + score + ', गलत ' + wrong + ', बिना जवाब ' + skipped + '"><span class="result-chart-correct" style="width:' + correctWidth + '%"></span><span class="result-chart-wrong" style="width:' + wrongWidth + '%"></span><span class="result-chart-skipped" style="width:' + skippedWidth + '%"></span></div><p class="result-legend"><span>सही ' + score + '</span><span>गलत ' + wrong + '</span><span>छूटे ' + skipped + '</span></p><p class="result-save-status" aria-live="polite">' + escapeHtml(saveStatus || "") + '</p></div><section class="answer-review"><h3>प्रश्नों का विश्लेषण</h3>';
    result.answers.forEach(function(answer, index) {
        var isSkipped = answer.selectedIndex === null;
        var isCorrect = !isSkipped && answer.selectedIndex === answer.correctIndex;
        var status = isSkipped ? "जवाब नहीं दिया" : (isCorrect ? "सही जवाब" : "गलत जवाब");
        var statusClass = isSkipped ? "is-skipped" : (isCorrect ? "is-correct" : "is-wrong");
        var chosen = isSkipped ? "जवाब नहीं दिया" : answer.options[answer.selectedIndex];
        html += '<article class="answer-review-card ' + statusClass + '"><h4>प्रश्न ' + (index + 1) + ': ' + escapeHtml(answer.question) + '</h4><p><strong>स्थिति:</strong> ' + status + '</p><p><strong>आपका जवाब:</strong> ' + escapeHtml(chosen) + '</p><p><strong>सही जवाब:</strong> ' + escapeHtml(answer.options[answer.correctIndex]) + '</p>' +
            (answer.explanation ? '<p><strong>व्याख्या:</strong> ' + escapeHtml(answer.explanation) + '</p>' : '') + '</article>';
    });
    html += '</section><button class="quiz-action" type="button" onclick="' + (result.kind === "live" ? "openLiveTests()" : "openMockTests()") + '">वापस जाएं</button>';
    stage.innerHTML = html;
}

function formatTestDuration(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainder = seconds % 60;
    return minutes + " मिनट " + remainder + " सेकंड";
}

async function loadTestResultHistory(kind, containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    try {
        var response = await requestStudentApi("/api/results?kind=" + encodeURIComponent(kind));
        if (!response.results.length) {
            container.textContent = "अभी कोई टेस्ट रिजल्ट सेव नहीं है।";
            return;
        }
        container.innerHTML = '<div class="result-history-list">' + response.results.map(function(result) {
            var percentage = result.total ? Math.round((result.score / result.total) * 100) : 0;
            return '<article class="result-history-card"><div><h3>' + escapeHtml(result.title) + '</h3><p>' + escapeHtml(result.exam) + ' · ' + escapeHtml(new Date(result.createdAt * 1000).toLocaleString()) + '</p></div><strong>' + result.score + '/' + result.total + ' · ' + percentage + '%</strong><button class="quiz-action" type="button" onclick="openSavedTestResult(' + result.id + ')">विश्लेषण देखें</button></article>';
        }).join("") + '</div>';
    } catch (error) {
        container.textContent = "टेस्ट हिस्ट्री लोड नहीं हो सकी। कृपया फिर कोशिश करें।";
        console.error("Could not load test result history.", error);
    }
}

async function openSavedTestResult(resultId) {
    renderAppPage('<header class="app-screen-heading"><span class="info-tag">TEST ANALYSIS</span><h1>टेस्ट विश्लेषण</h1></header><section class="quiz-card"><div class="quiz-body" id="saved-result-stage" aria-live="polite">रिजल्ट लोड हो रहा है...</div></section>');
    try {
        var response = await requestStudentApi("/api/results/" + encodeURIComponent(resultId));
        var stage = document.getElementById("saved-result-stage");
        if (stage) {
            stage.id = "practice-stage";
            renderPracticeResult(response.result, "यह रिजल्ट आपके अकाउंट से सेव किया गया है।");
        }
    } catch (error) {
        var stage = document.getElementById("saved-result-stage");
        if (stage) stage.textContent = "रिजल्ट लोड नहीं हो सका। कृपया हिस्ट्री से दोबारा खोलें।";
    }
}

function selectPracticeAnswer(optionIndex) {
    if (!activePractice || activePractice.answered) return;
    if (!isStudentLoggedIn()) {
        requireStudentLogin(renderPracticeQuestion);
        return;
    }
    var question = activePractice.test.questions[activePractice.index];
    activePractice.selectedIndex = optionIndex;
    activePractice.answered = true;
    activePractice.selectedAnswers[activePractice.index] = optionIndex;
    if (optionIndex === question.correctIndex) activePractice.score += 1;
    renderPracticeQuestion();
}

function nextPracticeQuestion() {
    if (!activePractice || !activePractice.answered) return;
    activePractice.index += 1;
    activePractice.answered = false;
    activePractice.selectedIndex = -1;
    if (activePractice.index >= activePractice.test.questions.length) {
        completePracticeTest(false);
        return;
    }
    renderPracticeQuestion();
}

function renderHome() {
    var displayArea = document.getElementById("dynamic-content");
    if (!displayArea) return;

    mixedQuizIndex = 0;
    mixedQuizScore = 0;
    mixedQuizAnswered = false;
    mixedQuizSelectedIndex = -1;
    closeStudentAuthModal();
    displayArea.innerHTML = '<div class="home-page mock-home" id="home">' +
        '<section class="hero-section">' +
            '<div class="hero-left">' +
                '<span class="hero-brand-label">UP GK WALLAH · STUDY PORTAL</span>' +
                '<h1>सरकारी परीक्षा की<br><span>तैयारी अब आसान</span></h1>' +
                '<p>UPPSC, UP Police, SSC और अन्य परीक्षाओं के लिए विषयवार नोट्स, अभ्यास क्विज़ और मॉक टेस्ट — सब एक ही जगह।</p>' +
                '<div class="hero-actions">' +
                    '<button class="cta-card" type="button" onclick="goToMixedQuiz();"><span>अभ्यास शुरू करें</span><span aria-hidden="true">→</span></button>' +
                    '<a class="hero-secondary" href="#home-exams">परीक्षाएँ देखें</a>' +
                '</div>' +
            '</div>' +
        '</section>' +
        '<section class="exam-section" id="home-exams"><h2>अपनी परीक्षा चुनें</h2>' + renderExamCatalogMarkup() + '</section>' +
        '<section class="subject-section" id="home-subjects"><h2>विषयवार सूची</h2><p>किसी विषय को चुनकर उसकी थ्योरी और अभ्यास प्रश्न खोलें।</p>' + renderSubjectCatalogMarkup() + '</section>' +
        '<section class="quiz-card" id="quiz" aria-labelledby="quiz-title"><header class="quiz-heading"><div class="quiz-heading-top"><div><span class="quiz-kicker">आज का अभ्यास</span><h2 id="quiz-title">10 महत्वपूर्ण मिक्स सवाल</h2></div><span class="quiz-count">10 प्रश्न · 3 अध्याय</span></div><p>प्रागैतिहासिक काल, सिंधु घाटी सभ्यता और वैदिक काल से चुने गए सवालों के साथ अपनी तैयारी जाँचें।</p></header><div class="quiz-body protected-copy" id="mixed-quiz-stage" aria-live="polite"></div></section>' +
        '<section class="info-grid">' +
            '<article class="info-card">' +
                '<span class="info-tag">ABOUT</span>' +
                '<h3>हमारे बारे में</h3>' +
                '<p>UP GK Wallah एक आधुनिक अध्ययन पोर्टल है जो छात्रों को सरल भाषा में इतिहास, भूगोल, विज्ञान और सामान्य ज्ञान की तैयारी करने में मदद करता है।</p>' +
            '</article>' +
            '<article class="info-card">' +
                '<span class="info-tag">CONTACT</span>' +
                '<h3>संपर्क करें</h3>' +
                '<p>ईमेल: support@upgkwallah.in</p>' +
                '<p>फोन: +91 98765 43210</p>' +
                '<p>पता: Lucknow, Uttar Pradesh</p>' +
            '</article>' +
        '</section>' +
        '</div>';
    renderHeaderAuthActions();
    renderMixedQuiz();
}

function renderMixedQuiz() {
    var stage = document.getElementById("mixed-quiz-stage");
    if (!stage) return;

    if (mixedQuizIndex >= mixedQuizQuestions.length) {
        var resultMessage = mixedQuizScore >= 8
            ? "शानदार तैयारी! इसी तरह अभ्यास जारी रखें।"
            : mixedQuizScore >= 5
                ? "अच्छी कोशिश! अध्यायों की थ्योरी दोहराकर फिर प्रयास करें।"
                : "अभ्यास जारी रखें—हर प्रयास से आपकी तैयारी बेहतर होगी।";
        stage.innerHTML = '<div class="quiz-result"><span class="quiz-kicker">क्विज़ पूरा हुआ</span><strong class="quiz-result-score">' + mixedQuizScore + ' / ' + mixedQuizQuestions.length + '</strong><p>' + resultMessage + '</p><button class="quiz-action" type="button" onclick="restartMixedQuiz()">फिर से क्विज़ दें</button></div>';
        return;
    }

    var questionReference = mixedQuizQuestions[mixedQuizIndex];
    var chapter = masterStudyDatabase[questionReference.chapterId];
    var question = chapter.questions[questionReference.questionIndex];
    var progress = Math.round((mixedQuizIndex / mixedQuizQuestions.length) * 100);
    var html = '<div class="quiz-progress-row"><span>प्रश्न ' + (mixedQuizIndex + 1) + ' / ' + mixedQuizQuestions.length + '</span><span>सही जवाब: ' + mixedQuizScore + '</span></div>' +
        '<div class="quiz-progress-track" role="progressbar" aria-label="क्विज़ प्रगति" aria-valuemin="0" aria-valuemax="10" aria-valuenow="' + mixedQuizIndex + '"><div class="quiz-progress-fill" style="width: ' + progress + '%"></div></div>' +
        '<span class="quiz-topic">' + chapter.title + '</span><h3 class="quiz-question">' + question.q + '</h3><div class="options-grid">';

    question.options.forEach(function(option, optionIndex) {
        var stateClass = "";
        if (mixedQuizAnswered && optionIndex === question.correctIndex) {
            stateClass = " correct-pick";
        } else if (mixedQuizAnswered && optionIndex === mixedQuizSelectedIndex) {
            stateClass = " wrong-pick";
        }
        html += '<button class="opt-btn' + stateClass + '" type="button" onclick="selectMixedAnswer(' + optionIndex + ')"' + (mixedQuizAnswered ? " disabled" : "") + '>' + option + '</button>';
    });

    if (mixedQuizAnswered) {
        var isCorrect = mixedQuizSelectedIndex === question.correctIndex;
        html += '<div class="quiz-feedback' + (isCorrect ? "" : " is-wrong") + '"><strong>' + (isCorrect ? "बिल्कुल सही!" : "इसका सही उत्तर: " + question.options[question.correctIndex]) + '</strong>' + question.explanation + '</div>';
    }

    html += '<div class="quiz-footer"><span class="quiz-score-live">' + (mixedQuizAnswered ? "उत्तर दर्ज हो गया" : "एक सही विकल्प चुनें") + '</span><button class="quiz-action" type="button" onclick="advanceMixedQuiz()"' + (mixedQuizAnswered ? "" : " disabled") + '>' + (mixedQuizIndex === mixedQuizQuestions.length - 1 ? "नतीजा देखें" : "अगला सवाल") + '</button></div>';
    stage.innerHTML = html;
}

function selectMixedAnswer(optionIndex) {
    if (!isStudentLoggedIn()) {
        requireStudentLogin(function() {});
        return;
    }

    if (mixedQuizAnswered) return;

    var questionReference = mixedQuizQuestions[mixedQuizIndex];
    var question = masterStudyDatabase[questionReference.chapterId].questions[questionReference.questionIndex];
    mixedQuizSelectedIndex = optionIndex;
    mixedQuizAnswered = true;
    if (optionIndex === question.correctIndex) {
        mixedQuizScore += 1;
    }
    renderMixedQuiz();
}

function advanceMixedQuiz() {
    if (!mixedQuizAnswered) return;

    mixedQuizIndex += 1;
    mixedQuizAnswered = false;
    mixedQuizSelectedIndex = -1;
    renderMixedQuiz();
}

function restartMixedQuiz() {
    mixedQuizIndex = 0;
    mixedQuizScore = 0;
    mixedQuizAnswered = false;
    mixedQuizSelectedIndex = -1;
    renderMixedQuiz();
}

function toggleDropdown(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

function loadChapterData(chapterId) {
    requireStudentLogin(function() {
        var displayArea = document.getElementById("dynamic-content");
        if (!displayArea) return;

        var data = masterStudyDatabase[chapterId];
    
    // Fallback block string builder if no data is found
    if (!data) {
        displayArea.innerHTML = '<div class="theory-card"><h2>अध्याय नोट्स</h2><div class="theory-text"><p style="color: #777; font-style: italic; margin-top: 10px;">इस अध्याय की विस्तृत थ्योरी नोट्स और अभ्यास मॉक टेस्ट प्रश्न जल्द ही अपडेट किए जाएंगे।</p></div></div>';
        return;
    }

    // Creating layout using clean standard concatenation variables to avoid syntax parsing breaks
    var theoryHtml = Array.isArray(data.theory)
        ? data.theory.map(function(paragraph) {
            return '<p>' + paragraph + '</p>';
        }).join("")
        : '<p>' + data.theory + '</p>';
    var htmlStr = '<div class="theory-card"><h2>' + data.title + '</h2><div class="theory-text"><h4 style="color: #004085;">📖 चैप्टर विस्तृत थ्योरी:</h4>' + theoryHtml + '</div>';

    if (data.studyAid && Array.isArray(data.studyAid.columns) && Array.isArray(data.studyAid.rows)) {
        htmlStr += '<section class="study-aid"><h3>' + escapeHtml(data.studyAid.title || "महत्त्वपूर्ण तालिका") + '</h3><div class="study-aid-table-wrap" role="region" aria-label="' + escapeHtml(data.studyAid.title || "महत्त्वपूर्ण तालिका") + '" tabindex="0"><table class="study-aid-table"><thead><tr>' +
            data.studyAid.columns.map(function(column) {
                return '<th scope="col">' + escapeHtml(column) + '</th>';
            }).join("") +
            '</tr></thead><tbody>' +
            data.studyAid.rows.map(function(row) {
                return '<tr>' + row.map(function(cell) {
                    return '<td>' + escapeHtml(cell) + '</td>';
                }).join("") + '</tr>';
            }).join("") +
            '</tbody></table></div></section>';
    }

    if (data.imageUrl && data.imageUrl.trim() !== "") {
        htmlStr += '<div style="text-align: center; margin-top: 15px;"><img src="' + data.imageUrl + '" class="chapter-image" alt="' + escapeHtml(data.imageAlt || "अध्याय का चित्र") + '"></div>';
    }
    htmlStr += '</div>';

    // Questions loops logic rendering zone
    if (data.questions && data.questions.length > 0) {
        htmlStr += '<h3 style="margin: 20px 0 10px 5px; color: #28a745;">📝 अभ्यास टेस्ट:</h3>';
        
        data.questions.forEach(function(quiz, qIndex) {
            htmlStr += '<div class="question-card"><p style="font-weight:bold;">Q' + (qIndex + 1) + '. ' + quiz.q + '</p><div class="options-grid">';

            quiz.options.forEach(function(optionText, optIndex) {
                var isRight = (optIndex === quiz.correctIndex);
                htmlStr += '<button class="opt-btn ' + (isRight ? 'correct-flag' : '') + '" onclick="validateSelection(this, ' + isRight + ')">' + optionText + '</button>';
            });

            var targetId = 'explain_' + chapterId + '_' + qIndex;
            htmlStr += '</div><button class="ans-toggle-btn" onclick="showBlockBox(\'' + targetId + '\')">सही उत्तर देखें</button><div id="' + targetId + '" class="explanation-box" style="display: none;"><p><strong>सही उत्तर:</strong> ' + quiz.options[quiz.correctIndex] + '</p><p><strong>व्याख्या:</strong> ' + quiz.explanation + '</p></div></div>';
        });
    }

        displayArea.innerHTML = htmlStr;
    });
}

function showBlockBox(elementId) {
    var box = document.getElementById(elementId);
    if (box) {
        box.style.display = 'block';
    }
}

function validateSelection(btnElement, isCorrect) {
    if (!isStudentLoggedIn()) {
        requireStudentLogin(function() {});
        return;
    }

    if (isCorrect) {
        btnElement.classList.add("correct-pick");
    } else {
        btnElement.classList.add("wrong-pick");
        var exactCorrectBtn = btnElement.parentElement.querySelector(".correct-flag");
        if (exactCorrectBtn) {
            exactCorrectBtn.classList.add("correct-pick");
        }
    }
}

document.addEventListener("copy", function(event) {
    if (event.target && event.target.closest && event.target.closest(".protected-copy, .theory-card, .question-card, .quiz-body")) {
        event.preventDefault();
    }
});

document.addEventListener("contextmenu", function(event) {
    if (event.target && event.target.closest && event.target.closest(".protected-copy, .theory-card, .question-card, .quiz-body")) {
        event.preventDefault();
    }
});

document.addEventListener("keydown", function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "c") {
        var protectedTarget = event.target && event.target.closest ? event.target.closest(".protected-copy, .theory-card, .question-card, .quiz-body") : null;
        if (protectedTarget) {
            event.preventDefault();
        }
    }
});

renderHome();
initializeStudentSession();
initializeAdminSession();
window.addEventListener("hashchange", function() {
    if (window.location.hash === "#owner-admin") {
        openAdminPanel();
    }
});
if (window.location.hash === "#owner-admin") {
    openAdminPanel();
}
