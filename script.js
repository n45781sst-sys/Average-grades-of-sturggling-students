const studentForm = document.getElementById("studentForm");

const studentsTable = document.getElementById("studentsTable");
const resultsTable = document.getElementById("resultsTable");
const noResults = document.getElementById("noResults");

let students = [];

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const id = document.getElementById("studentId").value.trim();

    const average = Number(
        document.getElementById("average").value
    );

    if (id === "" || average < 0 || average > 100 ||
        document.getElementById("average").value === "") {
        alert("من فضلك أدخل بيانات صحيحة");
        return;
    }

    if (students.some(student => student.id === id)) {
        alert("رقم الطالب موجود بالفعل");
        return;
    }

    const student = {
        id: id,
        average: average
    };

    students.push(student);

    displayStudents();
    displayResults();

    studentForm.reset();
});

function displayStudents() {

    studentsTable.innerHTML = "";

    students.forEach(student => {

        studentsTable.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.average}</td>
            </tr>
        `;

    });
}

function displayResults() {

    resultsTable.innerHTML = "";

    const strugglingStudents = students.filter(student =>
        student.average >= 40 && student.average <= 49
    );

    if (strugglingStudents.length === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }

    strugglingStudents.forEach(student => {

        const newAverage = Math.min(student.average + 5, 50);

        resultsTable.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.average}</td>
                <td>${newAverage}</td>
            </tr>
        `;

    });
}