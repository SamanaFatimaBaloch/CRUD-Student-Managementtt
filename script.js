// Get elements from HTML

const studentForm = document.getElementById("studentForm");
const studentId = document.getElementById("studentId");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const departmentInput = document.getElementById("department");
const semesterInput = document.getElementById("semester");

const studentTableBody =
    document.getElementById("studentTableBody");

const emptyMessage =
    document.getElementById("emptyMessage");

const studentCount =
    document.getElementById("studentCount");

const formTitle =
    document.getElementById("formTitle");

const submitBtn =
    document.getElementById("submitBtn");

const cancelBtn =
    document.getElementById("cancelBtn");


// Get students from localStorage

let students =
    JSON.parse(localStorage.getItem("students")) || [];


// READ operation

function displayStudents() {

    studentTableBody.innerHTML = "";

    if (students.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

        students.forEach((student, index) => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>

                <td>${student.name}</td>

                <td>${student.email}</td>

                <td>${student.department}</td>

                <td>${student.semester}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editStudent(${student.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${student.id})"
                    >
                        Delete
                    </button>

                </td>
            `;

            studentTableBody.appendChild(row);
        });
    }

    studentCount.textContent =
        `${students.length} Student${students.length !== 1 ? "s" : ""}`;
}


// CREATE operation

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const department = departmentInput.value;
    const semester = semesterInput.value;

    // UPDATE

    if (studentId.value !== "") {

        const id = Number(studentId.value);

        const student = students.find(
            student => student.id === id
        );

        if (student) {

            student.name = name;
            student.email = email;
            student.department = department;
            student.semester = semester;

        }

        alert("Student updated successfully!");

    }

    // CREATE

    else {

        const newStudent = {

            id: Date.now(),

            name: name,

            email: email,

            department: department,

            semester: semester
        };

        students.push(newStudent);

        alert("Student added successfully!");
    }


    saveStudents();

    displayStudents();

    resetForm();

});


// DELETE operation

function deleteStudent(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) {
        return;
    }

    students =
        students.filter(student => student.id !== id);

    saveStudents();

    displayStudents();

    alert("Student deleted successfully!");
}


// Edit student

function editStudent(id) {

    const student =
        students.find(student => student.id === id);

    if (!student) {
        return;
    }

    studentId.value = student.id;

    nameInput.value = student.name;

    emailInput.value = student.email;

    departmentInput.value = student.department;

    semesterInput.value = student.semester;


    formTitle.textContent = "Update Student";

    submitBtn.textContent = "Update Student";

    cancelBtn.style.display = "inline-block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Cancel edit

function cancelEdit() {

    resetForm();

}


// Reset form

function resetForm() {

    studentForm.reset();

    studentId.value = "";

    formTitle.textContent = "Add Student";

    submitBtn.textContent = "Add Student";

    cancelBtn.style.display = "none";
}


// Save data to localStorage

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


// Display students when page loads

displayStudents();