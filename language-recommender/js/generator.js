const allData = [
    {
        key: 'first',
        question: "Why do you want to learn programming?",
        options: [
            {
                id: "job",
                text: "To get a Job",
            },
            {
                id: "start-up",
                text: "For a Start-up"
            },
            {
                id: "fun",
                text: "Just for Fun"
            },
            {
                id: "freelancer",
                text: 'Work as a Freelancer'
            },
            {
                id: 'no-idea',
                text: "No Idea"
            },
            {
                id: "school",
                text: "For my School/ High-School"
            },
            {
                id: "skill",
                text: "To enhance my Skills"
            }
        ]
    }
    ,
    {
        key: 'job',
        question: "Which of the following fields are you interested in to get a job?",
        options: [
            {
                id: "job-app",
                text: "App Development",
            },
            {
                id: "job-web",
                text: "Web Development"
            },
            {
                id: "job-machine",
                text: "Machine Learning and Artificial Intelligence"
            },
            {
                id: "job-data-science",
                text: 'Data Science and Data Analysis'
            },
            {
                id: "job-game-dev",
                text: "Game Development"
            },
            {
                id: "job-desktop-app",
                text: "Desktop App Development"
            }
        ]
    },
    {
        key: 'start-up',
        question: "What kind of product do you wish to develop for your startup?",
        options: [
            {
                id: "start-up-app",
                text: "App Development",
            },
            {
                id: "start-up-web",
                text: "Web Development"
            },
            {
                id: "start-up-machine",
                text: "Machine Learning and Artificial Intelligence"
            },
            {
                id: "start-up-data-science",
                text: 'Data Science and Data Analysis'
            },
            {
                id: "start-up-game-dev",
                text: "Game Development"
            },
            {
                id: "start-up-desktop-app",
                text: "Desktop App Development"
            }
        ]
    },
    {
        key: 'fun',
        question: "Ok, you want to learn programming just for fun. Do you wish to dive deep into the field later on?",
        options: [
            {
                id: "yes-c",
                text: "Yes",
            },
            {
                id: "no-python",
                text: "No"
            },
        ]
    },
    {
        key: 'freelancer',
        question: "Which of the following fields are you interested in working as a freelancer?",
        options: [
            {
                id: "freelance-app",
                text: "App Development",
            },
            {
                id: "freelance-web",
                text: "Web Development"
            },
        ]
    },
    
    {
        key: 'school',
        question: "At which grade you are in the school?",
        options: [
            {
                id: "primary-scratch",
                text: "Pre Primary",
            },
            {
                id: "primary-python",
                text: "Primary"
            },
            {
                id: "secondary-c",
                text: "Secondary",
            },
            {
                id: "high-school-java",
                text: "High School"
            },
        ]
    },
    {
        key: 'skill',
        question: "Which field are you in?",
        options: [
            {
                id: "it-field",
                text: "IT Field",
            },
            {
                id: "non-it-filed",
                text: "Non-IT Field "
            },
        ]
    },

    // job app
    {
        key: "job-app",
        question: "What types of apps do you wish to develop?",
        options: [
            {
                id: "android-java",
                text: "Android",
                reason: "When we talk about android application development, Java is the absolute choice to begin with. Java is a powerful language for android apps and has been there for a while, but still, it is high in demand. Later, slowly you can move to Kotlin"
            },
            {
                id: "ios-swift",
                text: "iOS",
                reason: "iOS development has drastically changed over the past years. Objective-C was the only top choice for iOS development a few years ago, but, with the introduction of Swift in 2014, Swift is ruling the iOS world. Therefore, it should probably be your choice for iOS."
            },
            {
                id: "cross-flutter",
                text: "Cross-Platform (Both)",
                reason: "Flutter which is a cross-platform mobile application development framework uses Dart programming language. Therefore, to start with Flutter, you'll also need to learn Dart. With the growing technologies, cross-platform development has changed over the years. Flutter is quite new in the market that helps to develop beautiful UI apps for both Android and iOS with a single codebase."
            },
        ]
    },
    // Job Web
    {
        key: "job-web",
        question: "On which part of the web do you wish to work?",
        options: [
            {
                id: "frontend",
                text: "Front-End",
                reason: "HTML and CSS are the basic building blocks of the web. If you want to get started with front-end web development, HTML and CSS are probably the first steps that help you to create the basic UI layout of the webpage. Modern sites need to be interactive, JavaScript handles that part for you. Therefore, HTML, CSS, and JS should be your choice to start with front-end development. "
            },
            {
                id: "backend",
                text: "Back-End",
                reason: "Backend development involves complex logic building and database interaction. There are many technologies that are good for the backend, but if you are looking for something powerful and future-proof, then Python is a go-to language for the backend. With Python, you'll need to get hands-on with at least one of its web frameworks such as Django or Flask."
            },
            {
                id: "full-stack",
                text: "Full-Stack",
                reason: "Flutter which is a cross-platform mobile application development framework uses Dart programming language. Therefore, to start with Flutter, you'll also need to learn Dart. With the growing technologies, cross-platform development has changed over the years. Flutter is quite new in the market that helps to develop beautiful UI apps for both Android and iOS with a single codebase."
            },
        ]
    },
    // job-machine - Try to fix this one. Do next
    {
        key: "job-machine",
        question: "Learn Python",
        options: [
            {
                id: 'learn-python',
                reason: "Machine Learning and Artificial Intelligence are the top trends for the future. Working with ML and AI is fun when you can create models easily and visualize data at ease. Python can do that for you. Python provides tons of powerful libraries that make working with ML and AI super fun, easy, and beginner-friendly."
            }
        ]
    },
    // job-data-science
    {
        key: "job-data-science",
        question: "From which field you are?",
        options: [
            {
                id: "it-field-python-julia",
                text: "IT Field",
                reason: "If you are from the IT Field, probably data science is an amazing field for you. Python and Julia are the best choices when it comes to data visualization and data analysis. Python is quite powerful with tons of libraries while Julia is quite young but has a bright future."
            },
            {
                id: "non-it-field-r",
                text: "Non-IT Field",
                reason: "If you are from a Non-IT field, data science is one of the most exciting fields that can help you work in a tech-related field.  The R language is widely used among statisticians and data miners for developing statistical software and data analysis. It is the best choice for Non-IT grads."
            },
        ]
    },
    // job-game-dev
    {
        key: "job-game-dev",
        question: "What kind of games do you wish to develop?",
        options: [
            {
                id: "game-c#",
                text: "Simple 2D or Basic 3D games",
            },
            {
                id: "aaa-c",
                text: "AAA Title powerful modern games",
            },
        ]
    },
    // job-desktop-app
    {
        key: "job-desktop-app",
        question: "What types of desktop apps do you wish to develop?",
        options: [
            {
                id: "windows-c#",
                text: "Windows",
                reason: "Desktop app development is yet another amazing development field with quite a high scope. C# (C-Sharp) is a programming language developed by Microsoft that runs on the .NET framework, which without any doubt is the best choice to develop apps for Windows. "
            },
            {
                id: "macos-swift",
                text: "macOS",
                reason: "Swift is a general-purpose, multi-paradigm, compiled programming language developed by Apple Inc. It is the only choice when it comes to developing anything for any operating system by Apple."
            },
            {
                id: "both-js",
                text: "Both",
                reason: "If you want to develop desktop apps that will work on both the major platforms―Windows and macOS, then JavaScript is a great choice for it. Modern JavaScript is very powerful and is a general-purpose language used in many fields. JavaScript’s framework Electron JS is a powerful and simple desktop app development tool."
            },
        ]
    },
    // start-up-app
    {
        key: "start-up-app",
        question: "What types of apps do you wish to develop?",
        options: [
            {
                id: "android-java",
                text: "Android",
                reason: "When we talk about android application development, Java is the absolute choice to begin with. Java is a powerful language for android apps and has been there for a while, but still, it is high in demand. Later, slowly you can move to Kotlin"
            },
            {
                id: "ios-swift",
                text: "iOS",
                reason: "iOS development has drastically changed over the past years. Objective-C was the only top choice for iOS development a few years ago, but, with the introduction of Swift in 2014, Swift is ruling the iOS world. Therefore, it should probably be your choice for iOS."
            },
            {
                id: "cross-flutter",
                text: "Cross-Platform (Both)",
                reason: "Flutter which is a cross-platform mobile application development framework uses Dart programming language. Therefore, to start with Flutter, you'll also need to learn Dart. With the growing technologies, cross-platform development has changed over the years. Flutter is quite new in the market that helps to develop beautiful UI apps for both Android and iOS with a single codebase."
            },
        ]
    },
    // start-up-web
    {
        key: "start-up-web",
        question: "What kind of application do you wish to develop?",
        options: [
            {
                id: "simple-javascript",
                text: "Simple and Lightweight",
                reason: "When it comes to web development, JavaScript is no doubt a one-sided winner. It does not matter what type of site you want to develop, JavaScript is something that you can consider."
            },
            {
                id: "complete-python",
                text: "Complex and Modern",
                reason: "Python web development is quite simple because you can easily achieve more functions with fewer lines of code. Also, Python is very powerful and its modern architecture is the best choice to develop modern-day full-fledge complex sites."
            },
        ]
    },
    // start-up-game-dev
    {
        key: "start-up-game-dev",
        question: "What kind of games do you wish to develop? ",
        options: [
            {
                id: "simple2d-c#",
                text: "Simple 2D or Basic 3D games",
                reason: "C# is widely-used to create games using the Unity game engine, which is the most popular game engine today. C# is a very popular tool for creating these applications and so makes a great choice for any programmer hoping to break into the game development industry. "
            },
            {
                id: "aaa-powerful-game",
                text: "AAA Title powerful modern games",
                reason: "If you want to develop modern and powerful games with high graphics, animations and features, C++ is a go-to choice. It is the choice for people who want to build AAA title games for PC and Mobile."
            },
        ]
    },
    // freelance-app
    {
        key: "freelance-app",
        question: "What types of apps do you wish to develop?",
        options: [
            {
                id: "freelance-android-java",
                text: "Android",
                reason: "When we talk about android application development, Java is the absolute choice to begin with. Java is a powerful language for android apps and has been there for a while, but still, it is high in demand. Later, slowly you can move to Kotlin."
            },
            {
                id: "freelance-ios-swift",
                text: "iOS",
                reason: "iOS development has drastically changed over the past years. Objective-C was the only top choice for iOS development a few years ago, but, with the introduction of Swift in 2014, Swift is ruling the iOS world. Therefore, it should probably be your choice for iOS."
            },
            {
                id: "freelance-cross-flutter",
                text: "Cross-Platform (Both)",
                reason: "Flutter which is a cross-platform mobile application development framework uses Dart programming language. Therefore, to start with Flutter, you'll also need to learn Dart. With the growing technologies, cross-platform development has changed over the years. Flutter is quite new in the market that helps to develop beautiful UI apps for both Android and iOS with a single codebase."
            },
        ]
    },
    // freelance-web
    {
        key: "freelance-web",
        question: "On which part of the web do you wish to work?",
        options: [
            {
                id: "freelance-web-frontend",
                text: "Front-End",
                reason: "HTML and CSS are the basic building blocks of the web. If you want to get started with front-end web development, HTML and CSS are probably the first steps that help you to create the basic UI layout of the webpage. Modern sites need to be interactive, JavaScript handles that part for you. Therefore, HTML, CSS, and JS should be your choice to start with front-end development."
            },
            {
                id: "freelance-web-backend",
                text: "Back-End",
                reason: "Backend development involves complex logic building and database interaction. There are many technologies that are good for the backend, but if you are looking for something powerful and future-proof, then Python is a go-to language for the backend. With Python, you'll need to get hands-on with at least one of its web frameworks such as Django or Flask."
            },
            {
                id: "freelance-web-fullstack",
                text: "Full-Stack",
                reason: "Full-stack development involves handling both―client-side and server-side. Learning different technologies for each can make your job tough, hence JavaScript is the best choice since it works well with both front-end and back-end. But, JavaScript won’t be enough for it, you might wish to get hands-on with its frameworks as well."
            },
        ]
    },

    // skills IT
    {
        key: "it-field",
        question: "Which of the following roles have you worked in?",
        options: [
            {
                id: "skill-python-js",
                text: "Developer",
            },
            {
                id: "non-dev-python",
                text: "Non-Developer",
            },
        ]
    },
    // skills Non-IT
    {
        key: "non-it-filed",
        question: "Do you completely wish to switch to programming?",
        options: [
            {
                id: "non-it-java",
                text: "Yes",
            },
            {
                id: "non-it-python-dev",
                text: "No",
            },
        ]
    },



    // reasons
    
    // Job App development reason
    {
        key: "android-java",
        language: "Java",
        reason: "When we talk about android application development, Java is the absolute choice to begin with. Java is a powerful language for android apps and has been there for a while, but still, it is high in demand. Later, slowly you can move to Kotlin.",
        
    },
    {
        key: "ios-swift",
        language: "SWIFT",
        reason: "iOS development has drastically changed over the past years. Objective-C was the only top choice for iOS development a few years ago, but, with the introduction of Swift in 2014, Swift is ruling the iOS world. Therefore, it should probably be your choice for iOS.",
        
    },
    {
        key: "cross-flutter",
        language: "FLUTTER",
        reason: "Flutter which is a cross-platform mobile application development framework uses Dart programming language. Therefore, to start with Flutter, you'll also need to learn Dart. With the growing technologies, cross-platform development has changed over the years. Flutter is quite new in the market that helps to develop beautiful UI apps for both Android and iOS with a single codebase.",
        
    },

    // Job web development reason
    {
        key: "frontend",
        language: "HTML, CSS & JS",
        reason: "HTML and CSS are the basic building blocks of the web. If you want to get started with front-end web development, HTML and CSS are probably the first steps that help you to create the basic UI layout of the webpage. Modern sites need to be interactive, JavaScript handles that part for you. Therefore, HTML, CSS, and JS should be your choice to start with front-end development.",
        
    },
    {
        key: "backend",
        language: "PYTHON",
        reason: "Backend development involves complex logic building and database interaction. There are many technologies that are good for the backend, but if you are looking for something powerful and future-proof, then Python is a go-to language for the backend. With Python, you'll need to get hands-on with at least one of its web frameworks such as Django or Flask.",
        
    },
    {
        key: "full-stack",
        language: "JavaScript and it’s frameworks",
        reason: "Full-stack development involves handling both―client-side and server-side. Learning different technologies for each can make your job tough, hence JavaScript is the best choice since it works well with both front-end and back-end. However, JavaScript won’t be enough for it, you might wish to get hands-on with its frameworks as well.",
    },

    // job Machine learning reason
    {
        key: "job-machine",
        language: "PYTHON",
        reason: "Machine Learning and Artificial Intelligence are the top trends for the future. Working with ML and AI is fun when you can create models easily and visualize data at ease. Python can do that for you. Python provides tons of powerful libraries that make working with ML and AI super fun, easy, and beginner-friendly.",
    },

    // job data science reason
    {
        key: "it-field-python-julia",
        language: "PYTHON or JULIA",
        reason: "Machine Learning and Artificial Intelligence are the top trends for the future. Working with ML and AI is fun when you can create models easily and visualize data at ease. Python can do that for you. Python provides tons of powerful libraries that make working with ML and AI super fun, easy, and beginner-friendly.",
    },
    {
        key: "non-it-field-r",
        language: "R",
        reason: "If you are from a Non-IT field, data science is one of the most exciting fields that can help you work in a tech-related field.  The R language is widely used among statisticians and data miners for developing statistical software and data analysis. It is the best choice for Non-IT grads.",
    },
    // job game development reason
    {
        key: "game-c#",
        language: "C#",
        reason: "C# is widely used to create games using the Unity game engine, which is the most popular game engine today. C# is a very popular tool for creating these applications and so makes a great choice for any programmer hoping to break into the game development industry."
    },
    {
        key: "aaa-c",
        language: "C++",
        reason: "If you want to develop modern and powerful games with high graphics, animations and features, C++ is a go-to choice. It is the choice for people who want to build AAA title games for PC and Mobile."
    },

    // job desktop app development reason
    {
        key: "windows-c#",
        language: "C#",
        reason: "Desktop app development is yet another amazing development field with quite a high scope. C# (C-Sharp) is a programming language developed by Microsoft that runs on the .NET framework, which without any doubt is the best choice to develop apps for Windows. "
    },
    {
        key: "macos-swift",
        language: "SWIFT",
        reason: "Swift is a general-purpose, multi-paradigm, compiled programming language developed by Apple Inc. It is the only choice when it comes to developing anything for any operating system by Apple."
    },
    {
        key: "both-js",
        language: "JAVASCRIPT",
        reason: "If you want to develop desktop apps that will work on both the major platforms―Windows and macOS, then JavaScript is a great choice for it. Modern JavaScript is very powerful and is a general-purpose language used in many fields. JavaScript’s framework Electron JS is a powerful and simple desktop app development tool."
    },

    // Start-up app development reason
    {
        key: "android-java",
        language: "JAVA",
        reason: "When we talk about android application development, Java is the absolute choice to begin with. Java is a powerful language for android apps and has been there for a while, but still, it is high in demand. Later, slowly you can move to Kotlin"
    },
    {
        key: "ios-swift",
        language: "SWIFT",
        reason: "iOS development has drastically changed over the past years. Objective-C was the only top choice for iOS development a few years ago, but, with the introduction of Swift in 2014, Swift is ruling the iOS world. Therefore, it should probably be your choice for iOS."
    },
    {
        key: "cross-flutter",
        language: "FLUTTER",
        reason: "Flutter which is a cross-platform mobile application development framework uses Dart programming language. Therefore, to start with Flutter, you'll also need to learn Dart. With the growing technologies, cross-platform development has changed over the years. Flutter is quite new in the market that helps to develop beautiful UI apps for both Android and iOS with a single codebase."
    },

    // start-up web dev reason
    {
        key: "simple-javascript",
        language: "JAVASCRIPT",
        reason: "When it comes to web development, JavaScript is no doubt a one-sided winner. It does not matter what type of site you want to develop, JavaScript is something that you can consider."
    },
    {
        key: "complete-python",
        language: "PYTHON",
        reason: "Python web development is quite simple because you can easily achieve more functions with fewer lines of code. Also, Python is very powerful and its modern architecture is the best choice to develop modern-day full-fledge complex sites."
    },

    // start-up game dev reason
    {
        key: "simple2d-c#",
        language: "C#",
        reason: "C# is widely-used to create games using the Unity game engine, which is the most popular game engine today. C# is a very popular tool for creating these applications and so makes a great choice for any programmer hoping to break into the game development industry. "
    },
    {
        key: "aaa-powerful-game",
        language: "C++",
        reason: "If you want to develop modern and powerful games with high graphics, animations and features, C++ is a go-to choice. It is the choice for people who want to build AAA title games for PC and Mobile."
    },

    // fun reason
    {
        key: "yes-c",
        language: "C#",
        reason: "C# is widely-used to create games using the Unity game engine, which is the most popular game engine today. C# is a very popular tool for creating these applications and so makes a great choice for any programmer hoping to break into the game development industry. "
    },
    {
        key: "no-python",
        language: "PYTHON",
        reason: "If you want to develop modern and powerful games with high graphics, animations and features, C++ is a go-to choice. It is the choice for people who want to build AAA title games for PC and Mobile."
    },

    // freelance app dev reason
    {
        key: "freelance-android-java",
        language: "JAVA",
        reason: "When we talk about android application development, Java is the absolute choice to begin with. Java is a powerful language for android apps and has been there for a while, but still, it is high in demand. Later, slowly you can move to Kotlin."
    },
    {
        key: "freelance-ios-swift",
        language: "SWIFT",
        reason: "iOS development has drastically changed over the past years. Objective-C was the only top choice for iOS development a few years ago, but, with the introduction of Swift in 2014, Swift is ruling the iOS world. Therefore, it should probably be your choice for iOS."
    },
    {
        key: "freelance-cross-flutter",
        language: "FLUTTER",
        reason: "Flutter which is a cross-platform mobile application development framework uses Dart programming language. Therefore, to start with Flutter, you'll also need to learn Dart. With the growing technologies, cross-platform development has changed over the years. Flutter is quite new in the market that helps to develop beautiful UI apps for both Android and iOS with a single codebase."
    },

    // freelance web dev reason
    {
        key: "freelance-web-frontend",
        language: "HTML, CSS & JS",
        reason: "HTML and CSS are the basic building blocks of the web. If you want to get started with front-end web development, HTML and CSS are probably the first steps that help you to create the basic UI layout of the webpage. Modern sites need to be interactive, JavaScript handles that part for you. Therefore, HTML, CSS, and JS should be your choice to start with front-end development."
    },
    {
        key: "freelance-web-backend",
        language: "PYTHON -Django or Flask",
        reason: "Backend development involves complex logic building and database interaction. There are many technologies that are good for the backend, but if you are looking for something powerful and future-proof, then Python is a go-to language for the backend. With Python, you'll need to get hands-on with at least one of its web frameworks such as Django or Flask."
    },
    {
        key: "freelance-web-fullstack",
        language: "Frontend & Backend",
        reason: "Full-stack development involves handling both―client-side and server-side. Learning different technologies for each can make your job tough, hence JavaScript is the best choice since it works well with both front-end and back-end. But, JavaScript won’t be enough for it, you might wish to get hands-on with its frameworks as well."
    },

    // no idea reason
    {
        key: 'no-idea',
        language: "PYTHON",
        reason: "If you have no idea what you want to do in the programming or computer science field, then you should probably go with Python. Python is an easy to learn, beginner-friendly, and English-like programming language. It will help you get comfortable in programming and give you a better idea for the future.",
        
    },

    // school/ high school reason
    {
        key: "primary-scratch",
        language: "SCRATCH",
        reason: "Scratch is a block-based visual programming language and website targeted primarily at children aged 8-16 to help learn code. It has a simple online editor with a drag and drops feature that makes it easier for kids to get comfortable with and learn the fundamental programming concepts.",
    },
    {
        key: "primary-python",
        language: "PYTHON",
        reason: "If you are a student in primary school, Python is something that is the most preferred. Python is an easy to learn, beginner-friendly, and English-like programming language. It will help you get comfortable in programming and give you a better idea for the future."
    },
    {
        key: "secondary-c",
        language: "C or C++",
        reason: "If you are a student in secondary school, C or C++ is the best choice that you can go with. These are the oldest yet the most powerful languages that will make your foundation really strong. Also, these are the most taught programming languages at the secondary grade level.",
    },
    {
        key: "high-school-java",
        language: "JAVA or C#",
        reason: "If you are a student in high school, Java or C# is the best choice. These two are general-purpose programming languages that will open wide doors for the future and will also give you an idea for the future path."
    },

    // skill reasons
    {
        key: "skill-python-js",
        language: "PYTHON or JAVASCRIPT",
        reason: "If you are from IT Field, you might want to choose something that has a really bright future, more opportunities and which might help you enhance your skills set. Therefore, Python or JavaScript can be your choice since they are the most trending, in-demand, and future-proof technologies.",
    },
    {
        key: "non-dev-python",
        language: "PYTHON",
        reason: "If you are from IT Field but a complete beginner in the development field, Python is the best choice for you. Python is an easy to learn, beginner-friendly, and English-like programming language. It will help you get comfortable in programming and give you a better idea for the future.",
    },

    // skill reasons
    {
        key: "non-it-java",
        language: "PYTHON",
        reason: "If you are from Non-IT Field and completely wish to switch to programming, you might consider choosing Java. As they say, Java is a programming language that will teach you how to write better code and become a better programmer."
    },
    {
        key: "non-it-python-dev",
        language: "PYTHON or SQL",
        reason: "If you are from a Non-IT Field and wish to learn programming, Python or SQL is something you should choose. Python or SQL is the most common language among Non-IT people."
    },

    // 
    

    // end reasons

];


let selectedQuiz = allData[0];



const heading = document.getElementById('heading');
const options = document.getElementById('options');
const reason = document.getElementById('reason');
const language = document.getElementById('language');
const next = document.getElementById('next');
options.innerHTML = '';

heading.innerText = selectedQuiz.question;
selectedQuiz.options.forEach((element, index) => {
    options.innerHTML += `
    <label class="col-large-6" style="margin: auto;">
        <input onClick="clicked('${index}','${element.id}')" type="radio" name="answer" value="${index}" required />
        <span>${element.text}</span>
    </label>
    
    `
});
// let selectedItem = 0;


function clicked(index, id) {
    selectedQuiz = allData.find(qz => qz.key === id);
}

next.addEventListener('click', function (e) {
    e.preventDefault();
    options.innerHTML = '';
    
    if (selectedQuiz.reason) {
        heading.innerText = '';
        language.innerText = selectedQuiz.language;
        reason.innerText = selectedQuiz.reason;
        next.style = 'display: none';
    } else {
        heading.innerText = selectedQuiz.question;
        selectedQuiz.options.forEach((element, index) => {
            options.innerHTML += `
        <label class="col-large-6" style="margin: auto;">
            <input onClick="clicked('${index}','${element.id}')" type="radio" name="answer" value="${index}" required />
            <span>${element.text}</span>
        </label>
        
        `
        });
    }
    

});