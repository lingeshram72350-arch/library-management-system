// High-Speed Firebase Realtime Cloud Setup
const firebaseConfig = {
    databaseURL: "https://library-demo-live-default-rtdb.firebaseio.com/"
};

let database = null;
try {
    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        database = firebase.database();
    }
} catch (e) {
    console.log("Firebase fallback active");
}

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

// 100+ FULL COLLEGE BOOKS CATALOG GENERATOR (ALL BOOKS ALWAYS AVAILABLE)
function generateFull100Catalog() {
    const catalog = [
        // FEATURED AADHI & NANDHANA SPECIAL BOOK
        { 
            id: "special_love_1", 
            title: "Eternal Symphony of Aadhi & Nandhana", 
            author: "Aadhi & Nandhana", 
            category: "General Fiction & Novels", 
            copies: 5, 
            rack: "Rack Love-01", 
            row: "Row 1, Heart Shelf", 
            wing: "Special Edition Wing", 
            image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400", 
            description: "Special Edition Chapter dedicated to Aadhi and Nandhana." 
        },

        // Harry Potter Series
        { id: "hp_1", title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", category: "General Fiction & Novels", copies: 5, rack: "Rack H-01", row: "Row 1, Shelf A", wing: "Fiction Wing", image: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400", description: "World-famous fantasy adventure novel series by J.K. Rowling." },
        { id: "hp_2", title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling", category: "General Fiction & Novels", copies: 4, rack: "Rack H-01", row: "Row 1, Shelf B", wing: "Fiction Wing", image: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400", description: "Second book in the iconic Harry Potter fantasy series." },
        { id: "hp_3", title: "Harry Potter and the Prisoner of Azkaban", author: "J.K. Rowling", category: "General Fiction & Novels", copies: 3, rack: "Rack H-01", row: "Row 2, Shelf A", wing: "Fiction Wing", image: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400", description: "Third novel following Harry Potter's third year at Hogwarts." }
    ];

    // B.Sc Computer Science Complete Subject Book Titles
    const bscCS_Subjects = [
        "Programming in C & Data Structures",
        "Python Programming Fundamentals",
        "Object Oriented Programming with C++",
        "Database Management Systems (DBMS)",
        "Relational SQL & NoSQL Architecture",
        "Operating System Concepts & Shell Scripting",
        "Computer Networks & Data Communication",
        "Java Programming & JDK Frameworks",
        "Web Technology (HTML, CSS, JS & PHP)",
        "Software Engineering & Agile Methodology",
        "Machine Learning with Python & Scikit-Learn",
        "Artificial Intelligence & Expert Systems",
        "Cyber Security & Ethical Hacking Protocols",
        "Cloud Computing Architecture & AWS",
        "Unix & Linux System Administration",
        "Mobile Application Development (Android/Flutter)",
        "Data Mining & Data Warehousing",
        "Computer Organization & Architecture",
        "Discrete Mathematics for Computer Science",
        "Digital Logic & Computer Design",
        "Compiler Design & Automata Theory",
        "Design & Analysis of Algorithms",
        "Computer Graphics & Multimedia Systems",
        "Big Data Analytics & Hadoop Architecture",
        "Internet of Things (IoT) & Embedded C"
    ];

    const csCovers = [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400"
    ];

    bscCS_Subjects.forEach((subj, i) => {
        catalog.push({
            id: `cs_sub_${i+1}`,
            title: subj,
            author: `Dr. CS Specialist ${i+1}`,
            category: "B.Sc Computer Science",
            copies: 5, // ALWAYS AVAILABLE
            rack: `Rack CS-0${Math.floor(i/5)+1}`,
            row: `Row ${(i%4)+1}, Shelf ${String.fromCharCode(65 + (i%3))}`,
            wing: "Computer Science Dept Wing",
            image: csCovers[i % csCovers.length],
            description: `Official college core syllabus textbook for B.Sc Computer Science degree stream covering ${subj}.`
        });
    });

    // B.Sc IT, B.E CSE, Physics, Chemistry, Maths
    const otherStreams = [
        { name: "B.Sc IT", prefix: "IT", cover: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400" },
        { name: "B.E CSE", prefix: "ENG-CSE", cover: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=400" },
        { name: "B.Sc Physics", prefix: "PHY", cover: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400" },
        { name: "B.Sc Chemistry", prefix: "CHEM", cover: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400" },
        { name: "B.Sc Mathematics", prefix: "MATH", cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400" }
    ];

    let count = 100;
    otherStreams.forEach(stream => {
        for (let k = 1; k <= 15; k++) {
            count++;
            catalog.push({
                id: `bk_${count}`,
                title: `${stream.name} University Standard Reference Part ${k}`,
                author: `Prof. Dr. ${stream.prefix} Specialist`,
                category: stream.name,
                copies: 4, // ALWAYS AVAILABLE
                rack: `Rack ${stream.prefix}-0${Math.ceil(k/4)}`,
                row: `Row ${(k%3)+1}, Shelf B`,
                wing: `${stream.name} Department Wing`,
                image: stream.cover,
                description: `Standard academic reference textbook for ${stream.name} undergraduate degree.`
            });
        }
    });

    return catalog;
}

// App Initialization
function initApp() {
    // FORCE RESET TO ALL AVAILABLE 100 BOOKS
    allBooks = generateFull100Catalog();
    localStorage.setItem('lib_books', JSON.stringify(allBooks));

    renderBooks();

    // Firebase Synchronizer
    if (database) {
        database.ref('books').on('value', (snapshot) => {
            const cloudData = snapshot.val();
            if (cloudData) {
                allBooks = [];
                for (let id in cloudData) {
                    let b = cloudData[id];
                    b.id = id;
                    b.copies = b.copies || 4; // Ensure available
                    allBooks.push(b);
                }
                localStorage.setItem('lib_books', JSON.stringify(allBooks));
                renderBooks();
            } else {
                let seedObj = {};
                let generated = generateFull100Catalog();
                generated.forEach(item => seedObj[item.id] = item);
                database.ref('books').set(seedObj);
            }
        });
    }
}

// Render Catalog
function renderBooks() {
    const container = document.getElementById('booksContainer');
    if (!container) return;

    let filtered = allBooks.filter(b => {
        let matchesDept = (currentDeptFilter === 'ALL') || (b.category === currentDeptFilter);
        let query = document.getElementById('searchInput') ? document.getElementById('searchInput').value.toLowerCase() : '';
        let matchesQuery = b.title.toLowerCase().includes(query) || 
                             b.author.toLowerCase().includes(query) || 
                             b.category.toLowerCase().includes(query) ||
                             (b.rack && b.rack.toLowerCase().includes(query));
        return matchesDept && matchesQuery;
    });

    const badge = document.getElementById('bookCountBadge');
    if (badge) badge.innerText = `${filtered.length} Books Located`;

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:30px; color:#64748b;">No books found matching search criteria.</div>`;
        return;
    }

    let cardsHtml = '';
    filtered.forEach(b => {
        // FORCE ALWAYS AVAILABLE
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
                            ● Available (${b.copies || 4} Copies)
                        </div>
                        <button class="btn-reserve-card" onclick="openModal('${b.id}')">
                            Locate Shelf & Check-Out
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
    let name = document.getElementById('gateStudentName').value;
    let roll = document.getElementById('gateRollNo').value;
    let dept = document.getElementById('gateDept').value;

    let entry = {
        name: name,
        roll: roll,
        dept: dept,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString()
    };

    if (database) database.ref('gateEntries').push(entry);

    let localEntries = JSON.parse(localStorage.getItem('lib_entries') || '[]');
    localEntries.unshift(entry);
    localStorage.setItem('lib_entries', JSON.stringify(localEntries));

    alert('⚡ Student Gate Entry Registered Successfully!');
    document.getElementById('gateEntryForm').reset();
}

// Modal Controls - FIXED POPUP
function openModal(id) {
    let book = allBooks.find(b => b.id === id);
    if (!book) return;

    document.getElementById('modalBookId').value = book.id;
    document.getElementById('modalBookImg').src = book.image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400';
    document.getElementById('modalBookDept').innerText = book.category;
    document.getElementById('modalBookTitle').innerText = book.title;
    document.getElementById('modalBookAuthor').innerText = `By ${book.author}`;
    document.getElementById('modalBookDesc').innerText = book.description || 'College curriculum edition textbook.';
    
    document.getElementById('modalRackNo').innerText = book.rack || 'Rack CS-01';
    document.getElementById('modalRowNo').innerText = book.row || 'Row 1, Shelf A';
    document.getElementById('modalWingNo').innerText = book.wing || 'Main Academic Library';

    document.getElementById('modalStockStatus').innerHTML = `<span class="stock-status in-stock">● In-Stock (${book.copies || 4} Copies Available)</span>`;
    
    const modal = document.getElementById('reserveModal');
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('reserveModal').style.display = 'none';
}

// Submit Check-Out
function submitReservation(e) {
    e.preventDefault();
    let bookId = document.getElementById('modalBookId').value;
    let studentName = document.getElementById('studentName').value;
    let studentId = document.getElementById('studentId').value;
    let bookTitle = document.getElementById('modalBookTitle').innerText;

    let req = {
        bookId: bookId,
        bookTitle: bookTitle,
        studentName: studentName,
        studentId: studentId,
        issueDate: new Date().toLocaleDateString(),
        status: "Checked-Out"
    };

    if (database) {
        database.ref('checkouts').push(req);
    }

    let localCheckouts = JSON.parse(localStorage.getItem('lib_checkouts') || '[]');
    localCheckouts.unshift(req);
    localStorage.setItem('lib_checkouts', JSON.stringify(localCheckouts));

    alert('🎉 Book Check-Out Registered Successfully!');
    closeModal();
    renderBooks();
    document.getElementById('reserveForm').reset();
}

// Admin Realtime Observers
if (document.getElementById('requestsTableBody')) {
    
    function loadLocalAdminTables() {
        let entries = JSON.parse(localStorage.getItem('lib_entries') || '[]');
        let gTable = document.getElementById('gateTableBody');
        if (gTable) {
            let html = '';
            entries.forEach(e => {
                html += `<tr><td><b>${e.name}</b></td><td>${e.roll}</td><td>${e.dept}</td><td>${e.time}</td><td><span style="color:#16a34a; font-weight:bold;">Active in Library</span></td></tr>`;
            });
            gTable.innerHTML = html || '<tr><td colspan="5">No gate entries logged yet.</td></tr>';
        }
        document.getElementById('metricGateEntries').innerText = entries.length;

        let checkouts = JSON.parse(localStorage.getItem('lib_checkouts') || '[]');
        let cTable = document.getElementById('requestsTableBody');
        let activeCount = 0;
        if (cTable) {
            let html = '';
            checkouts.forEach((req, idx) => {
                if (req.status === "Checked-Out") activeCount++;
                html += `
                    <tr>
                        <td><b>${req.bookTitle}</b></td>
                        <td>${req.studentName}</td>
                        <td>${req.studentId}</td>
                        <td>${req.issueDate}</td>
                        <td><span style="background:${req.status === 'Checked-Out' ? '#fef3c7' : '#dcfce7'}; color:${req.status === 'Checked-Out' ? '#d97706' : '#15803D'}; padding:3px 8px; border-radius:12px; font-weight:bold; font-size:11px;">${req.status}</span></td>
                        <td>
                            ${req.status === 'Checked-Out' ? `<button class="btn-checkin" onclick="processLocalCheckIn(${idx}, '${req.bookId}')">Process Check-In (Return)</button>` : 'Returned'}
                        </td>
                    </tr>
                `;
            });
            cTable.innerHTML = html || '<tr><td colspan="6">No books currently checked out.</td></tr>';
        }
        document.getElementById('metricIssuedBooks').innerText = activeCount;
        document.getElementById('metricTotalBooks').innerText = allBooks.length;
    }

    loadLocalAdminTables();

    if (database) {
        database.ref('gateEntries').on('value', snap => {
            let data = snap.val();
            let tbody = document.getElementById('gateTableBody');
            let count = 0;
            if (data) {
                let rowsHtml = '';
                for (let id in data) {
                    count++;
                    let entry = data[id];
                    rowsHtml = `<tr><td><b>${entry.name}</b></td><td>${entry.roll}</td><td>${entry.dept}</td><td>${entry.time}</td><td><span style="color:#16a34a; font-weight:bold;">Active in Library</span></td></tr>` + rowsHtml;
                }
                tbody.innerHTML = rowsHtml;
            }
            document.getElementById('metricGateEntries').innerText = count;
        });

        database.ref('checkouts').on('value', snap => {
            let data = snap.val();
            let tbody = document.getElementById('requestsTableBody');
            let activeCount = 0;
            if (data) {
                let rowsHtml = '';
                for (let id in data) {
                    let req = data[id];
                    if (req.status === "Checked-Out") activeCount++;
                    rowsHtml = `
                        <tr>
                            <td><b>${req.bookTitle}</b></td>
                            <td>${req.studentName}</td>
                            <td>${req.studentId}</td>
                            <td>${req.issueDate}</td>
                            <td><span style="background:${req.status === 'Checked-Out' ? '#fef3c7' : '#dcfce7'}; color:${req.status === 'Checked-Out' ? '#d97706' : '#15803D'}; padding:3px 8px; border-radius:12px; font-weight:bold; font-size:11px;">${req.status}</span></td>
                            <td>
                                ${req.status === 'Checked-Out' ? `<button class="btn-checkin" onclick="processCloudCheckIn('${id}', '${req.bookId}')">Process Check-In (Return)</button>` : 'Returned'}
                            </td>
                        </tr>
                    ` + rowsHtml;
                }
                tbody.innerHTML = rowsHtml;
            }
            document.getElementById('metricIssuedBooks').innerText = activeCount;
        });
    }
}

// Process Local Return
function processLocalCheckIn(index, bookId) {
    let checkouts = JSON.parse(localStorage.getItem('lib_checkouts') || '[]');
    if (checkouts[index]) {
        checkouts[index].status = "Checked-In (Returned)";
        localStorage.setItem('lib_checkouts', JSON.stringify(checkouts));
    }
    alert('✅ Book Check-In (Return) Processed Successfully!');
    window.location.reload();
}

function processCloudCheckIn(checkoutId, bookId) {
    if (database) {
        database.ref('checkouts/' + checkoutId).update({ status: "Checked-In (Returned)" });
    }
    alert('✅ Book Check-In (Return) Processed Successfully!');
}

// Add Custom Book
function addNewBook(e) {
    e.preventDefault();
    let title = document.getElementById('bookTitle').value;
    let author = document.getElementById('bookAuthor').value;
    let category = document.getElementById('bookCategory').value;
    let rack = document.getElementById('rackNo').value;
    let row = document.getElementById('rowNo').value;
    let copies = parseInt(document.getElementById('bookCopies').value);
    let image = document.getElementById('bookImage').value;

    let newBook = {
        id: 'custom_' + Date.now(),
        title: title,
        author: author,
        category: category,
        rack: rack,
        row: row,
        wing: `${category} Wing`,
        copies: copies,
        image: image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
        description: `Reference book for ${category} stream.`
    };

    allBooks.unshift(newBook);
    localStorage.setItem('lib_books', JSON.stringify(allBooks));

    if (database) {
        database.ref('books').push(newBook);
    }

    alert('✅ Book Added to Library Rack Successfully!');
    document.getElementById('addBookForm').reset();
    window.location.reload();
}

// Init App
initApp();