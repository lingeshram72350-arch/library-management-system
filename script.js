// ==========================================
// 1. OFFICIAL GOOGLE FIREBASE REALTIME ENGINE
// ==========================================
const firebaseConfig = {
    databaseURL: "https://library-demo-live-default-rtdb.firebaseio.com"
};

if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}
const db = (typeof firebase !== 'undefined') ? firebase.database() : null;

let allBooks = [];
let currentDeptFilter = 'ALL';

// Auth Guard for Admin Page
if (window.location.pathname.includes('admin.html')) {
    const isAuthenticated = localStorage.getItem('admin_logged_in');
    if (!isAuthenticated) {
        window.location.href = 'login.html';
    }
}

function handleAdminLogin(e) {
    e.preventDefault();
    const user = document.getElementById('adminUsername').value;
    const pass = document.getElementById('adminPassword').value;
    const alertBox = document.getElementById('loginAlert');

    if (user === 'nandhana' && pass === 'aadhi') {
        localStorage.setItem('admin_logged_in', 'true');
        window.location.href = 'admin.html';
    } else {
        alertBox.style.display = 'block';
        alertBox.innerText = '❌ Access Denied: Incorrect Passcode!';
    }
}

function handleAdminLogout() {
    localStorage.removeItem('admin_logged_in');
    window.location.href = 'login.html';
}

// ==========================================
// 2. 1000+ COMPREHENSIVE COLLEGE CATALOG
// ==========================================
function generateFull1000Catalog() {
    const catalog = [
        { 
            id: "special_love_1", 
            title: "Eternal Symphony of Aadhi & Nandhana", 
            author: "Aadhi & Nandhana", 
            authorBio: "Co-Authors & Creators of the Library Management System Architecture",
            category: "General Fiction & Novels", 
            copies: 5, 
            totalCopies: 5,
            rack: "Rack Love-01", 
            row: "Row 1, Heart Shelf", 
            wing: "Special Edition Wing", 
            image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400", 
            description: "A special commemorative edition chronicling the dedication, teamwork, and eternal journey of Aadhi and Nandhana.",
            chapters: [
                "Chapter 1: The First Spark",
                "Chapter 2: Conversations in Code",
                "Chapter 3: Shared Dreams & Ambitions",
                "Chapter 4: The Unwritten Symphony",
                "Chapter 5: Together Always"
            ]
        },
        { 
            id: "hp_1", 
            title: "Harry Potter and the Philosopher's Stone", 
            author: "J.K. Rowling", 
            authorBio: "British Author & Creator of the Wizarding World",
            category: "General Fiction & Novels", 
            copies: 5, 
            totalCopies: 5,
            rack: "Rack H-01", 
            row: "Row 1, Shelf A", 
            wing: "Fiction Wing", 
            image: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400", 
            description: "The classic introduction to Harry Potter as he discovers his magical heritage.",
            chapters: ["Chapter 1: The Boy Who Lived", "Chapter 2: The Vanishing Glass", "Chapter 3: The Letters from No One", "Chapter 4: The Keeper of the Keys"]
        },
        { 
            id: "hp_2", 
            title: "Harry Potter and the Chamber of Secrets", 
            author: "J.K. Rowling", 
            authorBio: "British Author & Creator of the Wizarding World",
            category: "General Fiction & Novels", 
            copies: 4, 
            totalCopies: 5,
            rack: "Rack H-01", 
            row: "Row 1, Shelf B", 
            wing: "Fiction Wing", 
            image: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400", 
            description: "Harry faces the sinister mysteries within Salazar Slytherin's hidden chamber.",
            chapters: ["Chapter 1: The Worst Birthday", "Chapter 2: Dobby's Warning", "Chapter 3: The Burrow"]
        }
    ];

    const bscCS_Core = [
        { title: "Programming in ANSI C & Data Structures", author: "E. Balagurusamy", bio: "Former Vice-Chancellor of Anna University", desc: "Core paper covering structured programming, pointers, queues, and tree architectures." },
        { title: "Object Oriented Programming with C++", author: "E. Balagurusamy", bio: "Acclaimed Author in Computer Science", desc: "Covers classes, operator overloading, inheritance, and polymorphic functions." },
        { title: "Database System Concepts (DBMS)", author: "Abraham Silberschatz & Korth", bio: "Yale University Professor & Computer Scientist", desc: "Relational database models, SQL optimization, normalization up to BCNF, and ACID transactions." },
        { title: "Operating System Principles", author: "Silberschatz, Peter Galvin & Gagne", bio: "Renowned Operating Systems Educator", desc: "Process scheduling, thread models, memory paging, and deadlock resolution." },
        { title: "Computer Networks & Topologies", author: "Andrew S. Tanenbaum", bio: "Professor Emeritus at Vrije Universiteit Amsterdam", desc: "OSI 7-Layer model, TCP/IP handshakes, routing protocols, and subnet masks." },
        { title: "Java Programming & Collections Framework", author: "E. Balagurusamy", bio: "Academic Writer & Computer Scientist", desc: "JVM internal architecture, multithreading pipelines, exception hierarchy, and collections." },
        { title: "Python Programming for Problem Solving", author: "Paul Deitel & Harvey Deitel", bio: "Prominent Software Engineering Authors", desc: "Python syntax, lists, dictionary maps, modules, and introductory NumPy." },
        { title: "Web Technologies (HTML5, CSS3, JS & PHP)", author: "Uttam K. Roy", bio: "IT Faculty Member, Jadavpur University", desc: "Responsive layout design, DOM event tree, client-server scripting, and MySQL access." },
        { title: "Software Engineering Principles", author: "Roger S. Pressman", bio: "Software Engineering Authority", desc: "Agile, Waterfall lifecycle models, SRS documentation, UML class models, and testing suites." }
    ];

    const covers = [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400",
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"
    ];

    bscCS_Core.forEach((subj, idx) => {
        catalog.push({
            id: `cs_main_${idx+1}`,
            title: subj.title,
            author: subj.author,
            authorBio: subj.bio,
            category: "B.Sc Computer Science",
            copies: 5,
            totalCopies: 5,
            rack: `Rack CS-0${Math.floor(idx/2)+1}`,
            row: `Row ${(idx%3)+1}, Shelf A`,
            wing: "Wing A (CS Department)",
            image: covers[idx % covers.length],
            description: subj.desc,
            chapters: [
                "Unit 1: Foundational Theories & Introduction",
                "Unit 2: Structural Architecture & Methodologies",
                "Unit 3: Implementation, Logic & Testing",
                "Unit 4: Advanced Systems & Industry Applications",
                "Unit 5: University Syllabus Lab Practice & Exercises"
            ]
        });
    });

    const departments = [
        { name: "B.Sc Computer Science", prefix: "CS" },
        { name: "B.Sc IT", prefix: "IT" },
        { name: "B.E CSE", prefix: "ENG-CSE" },
        { name: "B.Sc Physics", prefix: "PHY" },
        { name: "B.Sc Chemistry", prefix: "CHEM" },
        { name: "B.Sc Mathematics", prefix: "MATH" },
        { name: "General Fiction & Novels", prefix: "LIT" }
    ];

    let
