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

    let bookCounter = catalog.length;
    while (bookCounter < 1000) {
        let dept = departments[bookCounter % departments.length];
        let volNum = Math.floor(bookCounter / departments.length) + 1;
        catalog.push({
            id: `bk_vol_${bookCounter+1}`,
            title: `${dept.name} Academic Reference Volume ${volNum}`,
            author: `Prof. Dr. ${dept.prefix} Specialist`,
            authorBio: `Senior Professor & Research Fellow in Department of ${dept.name}`,
            category: dept.name,
            copies: 4,
            totalCopies: 4,
            rack: `Rack ${dept.prefix}-0${(volNum % 10) + 1}`,
            row: `Row ${(volNum % 4) + 1}, Shelf ${String.fromCharCode(65 + (volNum % 3))}`,
            wing: `${dept.name} Wing`,
            image: covers[bookCounter % covers.length],
            description: `Official academic standard library reference text for undergraduate study in ${dept.name}.`,
            chapters: [
                "Unit 1: Fundamental Concepts & Standard Frameworks",
                "Unit 2: Principles of Analytical Problem Solving",
                "Unit 3: System Modeling & Laboratory Methodology",
                "Unit 4: Advanced Formulations & Comprehensive Proofs",
                "Unit 5: Review Questions & Examination Case Studies"
            ]
        });
        bookCounter++;
    }

    return catalog;
}

// Global App Initialization
function initApp() {
    allBooks = generateFull1000Catalog();
    renderBooks();
    updateGlobalStockBadge();
    
    if (db) {
        db.ref('books_stock').on('value', (snap) => {
            const cloudStock = snap.val();
            if (cloudStock) {
                allBooks.forEach(b => {
                    if (cloudStock[b.id] !== undefined) {
                        b.copies = cloudStock[b.id];
                    }
                });
                renderBooks();
                updateGlobalStockBadge();
            }
        });
    }
}

function updateGlobalStockBadge() {
    let totalCopies = allBooks.reduce((sum, b) => sum + (b.copies || 0), 0);
    const badge = document.getElementById('globalStockBadge');
    if (badge) {
        badge.innerHTML = `<i class="fa-solid fa-boxes-stacked"></i> Available Stock: ${totalCopies.toLocaleString()} Copies`;
    }
}

function renderBooks() {
    const container = document.getElementById('booksContainer');
    if (!container) return;

    let filtered = allBooks.filter(b => {
        let matchesDept = (currentDeptFilter === 'ALL') || (b.category === currentDeptFilter);
        let query = document.getElementById('searchInput') ? document.getElementById('searchInput').value.toLowerCase().trim() : '';
        let matchesQuery = !query || b.title.toLowerCase().includes(query) || 
                             b.author.toLowerCase().includes(query) || 
                             b.category.toLowerCase().includes(query) ||
                             (b.rack && b.rack.toLowerCase().includes(query));
        return matchesDept && matchesQuery;
    });

    const badge = document.getElementById('bookCountBadge');
    if (badge) badge.innerText = `${filtered.length.toLocaleString()} Books Located`;

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:30px; color:#64748b;">No books found matching search criteria.</div>`;
        return;
    }

    let cardsHtml = '';
    filtered.slice(0, 150).forEach(b => {
        cardsHtml += `
            <div class="book-card">
                <div class="cover-wrapper">
                    <span class="badge-dept">${b.category}</span>
                    <span class="badge-rack-tag"><i class="fa-solid fa-location-dot"></i> ${b.rack || 'Rack CS-01'}</span>
                    <img src="${b.image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'}" alt="Cover" loading="lazy">
                </div>
                <div class="card-body">
                    <div>
                        <div class="book-title">${b.title}</div>
                        <div class="book-author">By ${b.author}</div>
                    </div>
                    <div>
                        <div class="stock-status in-stock">
                            ● In-Stock: ${b.copies || 0} / ${b.totalCopies || 5}
                        </div>
                        <button class="btn-reserve-card" onclick="openModal('${b.id}')">
                            View Chapters & Issue
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = cardsHtml;
}

function filterByDept(dept) {
    currentDeptFilter = dept;
    document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    renderBooks();
}

function filterBooks() {
    renderBooks();
}

// Student Gate Entry
function submitGateEntry(e) {
    e.preventDefault();
    let name = document.getElementById('gateStudentName').value.trim();
    let roll = document.getElementById('gateRollNo').value.trim();
    let dept = document.getElementById('gateDept').value;
    let movement = document.getElementById('gateMovementType').value;

    let entry = {
        name: name,
        roll: roll,
        dept: dept,
        type: movement,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
    };

    let localEntries = JSON.parse(localStorage.getItem('lib_entries') || '[]');
    localEntries.unshift(entry);
    localStorage.setItem('lib_entries', JSON.stringify(localEntries));

    if (db) {
        db.ref('gate_entries').push(entry).then(() => {
            alert(`⚡ Student Gate ${movement === 'CHECK-IN' ? 'Check-In' : 'Check-Out'} Registered Successfully!`);
            document.getElementById('gateEntryForm').reset();
        }).catch(() => {
            alert(`⚡ Student Gate ${movement === 'CHECK-IN' ? 'Check-In' : 'Check-Out'} Registered!`);
            document.getElementById('gateEntryForm').reset();
        });
    } else {
        alert(`⚡ Student Gate ${movement === 'CHECK-IN' ? 'Check-In' : 'Check-Out'} Registered!`);
        document.getElementById('gateEntryForm').reset();
    }
}

// Modal View
function openModal(id) {
    let book = allBooks.find(b => b.id === id);
    if (!book) return;

    document.getElementById('modalBookId').value = book.id;
    document.getElementById('modalBookImg').src = book.image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400';
    document.getElementById('modalBookDept').innerText = book.category;
    document.getElementById('modalBookTitle').innerText = book.title;
    document.getElementById('modalBookAuthor').innerText = book.author;
    document.getElementById('modalAuthorBio').innerText = book.authorBio || 'Curriculum Subject Expert';
    document.getElementById('modalBookDesc').innerText = book.description || 'Standard college curriculum edition textbook.';
    
    document.getElementById('modalRackNo').innerText = book.rack || 'Rack CS-01';
    document.getElementById('modalRowNo').innerText = book.row || 'Row 1, Shelf A';
    document.getElementById('modalWingNo').innerText = book.wing || 'Main Academic Wing';

    document.getElementById('modalStockStatus').innerHTML = `
        <span class="stock-status in-stock">
            ● Available on Shelf: <strong>${book.copies || 0}</strong> of ${book.totalCopies || 5} Copies
        </span>
    `;

    const chList = document.getElementById('modalChaptersList');
    chList.innerHTML = '';
    let chapters = book.chapters || [
        "Unit 1: Introduction & Fundamentals",
        "Unit 2: Architecture & Analysis",
        "Unit 3: Implementation Techniques",
        "Unit 4: Advanced Methodologies",
        "Unit 5: Case Studies & Projects"
    ];
    chapters.forEach(ch => {
        let chDiv = document.createElement('div');
        chDiv.className = 'chapter-pill';
        chDiv.innerHTML = `<i class="fa-solid fa-bookmark" style="color:#2563eb; font-size:9px;"></i> ${ch}`;
        chList.appendChild(chDiv);
    });

    const submitBtn = document.getElementById('btnModalSubmit');
    if ((book.copies || 0) <= 0) {
        submitBtn.disabled = true;
        submitBtn.innerText = "Out of Stock";
        submitBtn.style.opacity = "0.5";
    } else {
        submitBtn.disabled = false;
        submitBtn.innerText = "Confirm Book Check-Out";
        submitBtn.style.opacity = "1";
    }
    
    document.getElementById('reserveModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('reserveModal').style.display = 'none';
}

// Issue Book with Direct Key Generation
function submitReservation(e) {
    e.preventDefault();
    let bookId = document.getElementById('modalBookId').value;
    let studentName = document.getElementById('studentName').value.trim();
    let studentId = document.getElementById('studentId').value.trim();
    let book = allBooks.find(b => b.id === bookId);

    if (!book || (book.copies || 0) <= 0) {
        alert("Sorry! This volume is currently out of stock.");
        return;
    }

    let newCopies = (book.copies || 1) - 1;
    book.copies = newCopies;

    // Generate unique record key
    let uniqueRecordKey = db ? db.ref('active_checkouts').push().key : 'local_' + Date.now();

    let req = {
        key: uniqueRecordKey,
        bookId: bookId,
        bookTitle: book.title,
        studentName: studentName,
        studentId: studentId,
        issueDate: new Date().toLocaleDateString(),
        status: "Checked-Out",
        timestamp: Date.now()
    };

    let localCheckouts = JSON.parse(localStorage.getItem('lib_checkouts') || '[]');
    localCheckouts.unshift(req);
    localStorage.setItem('lib_checkouts', JSON.stringify(localCheckouts));

    if (db) {
        db.ref('active_checkouts/' + uniqueRecordKey).set(req);
        db.ref('books_stock/' + bookId).set(newCopies);
    }

    alert(`🎉 Success! "${book.title}" Checked Out. 1 Copy decremented from rack.`);
    closeModal();
    renderBooks();
    updateGlobalStockBadge();
    document.getElementById('reserveForm').reset();
}

// ========================================================
// 3. ADMIN REALTIME DASHBOARD & PERMANENT RETURN FIX
// ========================================================
if (document.getElementById('gateTableBody') || document.getElementById('requestsTableBody')) {
    
    // First display from local storage
    renderAdminGateTable(JSON.parse(localStorage.getItem('lib_entries') || '[]'));
    renderAdminCheckoutsTable(JSON.parse(localStorage.getItem('lib_checkouts') || '[]'));

    if (db) {
        db.ref('gate_entries').on('value', (snap) => {
            const data = snap.val();
            let entries = [];
            if (data) {
                for (let id in data) {
                    entries.unshift(data[id]);
                }
            } else {
                entries = JSON.parse(localStorage.getItem('lib_entries') || '[]');
            }
            renderAdminGateTable(entries);
        });

        // Sync and listen for checkout changes
        db.ref('active_checkouts').on('value', (snap) => {
            const data = snap.val();
            let checkouts = [];
            if (data) {
                for (let id in data) {
                    let item = data[id];
                    item.key = id;
                    checkouts.unshift(item);
                }
                localStorage.setItem('lib_checkouts', JSON.stringify(checkouts));
            } else {
                checkouts = JSON.parse(localStorage.getItem('lib_checkouts') || '[]');
            }
            renderAdminCheckoutsTable(checkouts);
        });
    }
}

function renderAdminGateTable(entries) {
    let gTable = document.getElementById('gateTableBody');
    if (!gTable) return;
    if (!entries || entries.length === 0) {
        gTable.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:15px; color:#64748b;">No gate entries logged yet today.</td></tr>';
        document.getElementById('metricGateEntries').innerText = "0";
        return;
    }
    let html = '';
    entries.forEach(e => {
        let isIn = (e.type || 'CHECK-IN') === 'CHECK-IN';
        html += `
            <tr>
                <td><b>${e.name || 'Student'}</b></td>
                <td>${e.roll || '-'}</td>
                <td>${e.dept || 'General'}</td>
                <td>${e.time || '-'}</td>
                <td>
                    <span style="background:${isIn ? '#dcfce7' : '#fee2e2'}; color:${isIn ? '#15803d' : '#b91c1c'}; padding:4px 10px; border-radius:12px; font-weight:bold; font-size:11px;">
                        ${isIn ? '🟢 Inside Library' : '🔴 Exited'}
                    </span>
                </td>
            </tr>
        `;
    });
    gTable.innerHTML = html;
    document.getElementById('metricGateEntries').innerText = entries.length;
}

function renderAdminCheckoutsTable(checkouts) {
    let cTable = document.getElementById('requestsTableBody');
    if (!cTable) return;
    if (!checkouts || checkouts.length === 0) {
        cTable.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:15px; color:#64748b;">No active book loans currently logged.</td></tr>';
        document.getElementById('metricIssuedBooks').innerText = "0";
        return;
    }
    let activeCount = 0;
    let html = '';
    checkouts.forEach((req, idx) => {
        let isOut = req.status === "Checked-Out";
        if (isOut) activeCount++;
        html += `
            <tr>
                <td><b>${req.bookTitle || 'Book'}</b></td>
                <td>${req.studentName || '-'}</td>
                <td>${req.studentId || '-'}</td>
                <td>${req.issueDate || '-'}</td>
                <td>
                    <span style="background:${isOut ? '#fef3c7' : '#dcfce7'}; color:${isOut ? '#d97706' : '#15803d'}; padding:4px 10px; border-radius:12px; font-weight:bold; font-size:11px;">
                        ${req.status}
                    </span>
                </td>
                <td>
                    ${isOut ? `<button class="btn-checkin" onclick="processReturn('${req.key || ''}', '${req.bookId}',${idx})">Process Check-In (Return)</button>` : '<span style="color:#16a34a; font-weight:bold;">Returned</span>'}
                </td>
            </tr>
        `;
    });
    cTable.innerHTML = html;
    document.getElementById('metricIssuedBooks').innerText = activeCount;
}

// 100% FIXED RETURN LOGIC: CLOUD & LOCAL SYNCHRONIZED
function processReturn(checkoutKey, bookId, localIndex) {
    if (!confirm("Are you sure you want to mark this book as Returned?")) {
        return;
    }

    // 1. Update Cloud First if key exists
    if (db && checkoutKey && !checkoutKey.startsWith('local_')) {
        db.ref('active_checkouts/' + checkoutKey).update({ 
            status: "Checked-In (Returned)",
            returnDate: new Date().toLocaleDateString()
        });
        
        let book = allBooks.find(b => b.id === bookId);
        let restoredCount = (book ? book.copies : 1) + 1;
        db.ref('books_stock/' + bookId).set(restoredCount);
    }

    // 2. Update Local Storage Immediately
    let localCheckouts = JSON.parse(localStorage.getItem('lib_checkouts') || '[]');
    if (localCheckouts[localIndex]) {
        localCheckouts[localIndex].status = "Checked-In (Returned)";
    }
    localCheckouts.forEach(item => {
        if (item.key === checkoutKey || (item.bookId === bookId && item.status === "Checked-Out")) {
            item.status = "Checked-In (Returned)";
        }
    });
    localStorage.setItem('lib_checkouts', JSON.stringify(localCheckouts));

    // 3. Restore Stock Locally
    let book = allBooks.find(b => b.id === bookId);
    if (book) {
        book.copies = (book.copies || 0) + 1;
        updateGlobalStockBadge();
        renderBooks();
    }

    // 4. Force Re-render Admin View
    renderAdminCheckoutsTable(localCheckouts);

    alert('✅ Book Check-In Complete! Status updated permanently.');
}

// Initialize Application
initApp();
