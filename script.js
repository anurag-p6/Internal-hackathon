document.addEventListener('DOMContentLoaded', () => {
    const viewBedsBtn = document.getElementById('viewBedsBtn');
    const admitPatientBtn = document.getElementById('admitPatientBtn');
    const bedSection = document.getElementById('bedAvailability');
    const admitSection = document.getElementById('admitPatient');
    const admitForm = document.getElementById('admitForm');
    const hospitalSelect = document.getElementById('hospitalSelect');

    viewBedsBtn.addEventListener('click', () => {
        bedSection.classList.add('active');
        admitSection.classList.remove('active');
        fetchBedAvailability();
    });

    admitPatientBtn.addEventListener('click', () => {
        admitSection.classList.add('active');
        bedSection.classList.remove('active');
        populateHospitalOptions();
    });

    admitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const patientName = document.getElementById('patientName').value;
        const selectedHospital = hospitalSelect.value;
        admitPatient(patientName, selectedHospital);
    });

    function fetchBedAvailability() {
        // Example data provided in JSON format
        const bedsData = [
            { name: "AIIMS Delhi", criticalWithoutVentilator: "15", criticalWithVentilator: "8", nonCritical: "20" },
            { name: "Fortis Hospital, Shalimar Bagh", criticalWithoutVentilator: "22", criticalWithVentilator: "10", nonCritical: "18" },
            { name: "Apollo Hospital", criticalWithoutVentilator: "5", criticalWithVentilator: "12", nonCritical: "25" },
            { name: "Sir Ganga Ram Hospital", criticalWithoutVentilator: "14", criticalWithVentilator: "7", nonCritical: "16" },
            { name: "BLK Super Speciality Hospital", criticalWithoutVentilator: "18", criticalWithVentilator: "9", nonCritical: "30" },
            { name: "Medanta - The Medicity", criticalWithoutVentilator: "11", criticalWithVentilator: "15", nonCritical: "22" },
            { name: "Max Super Speciality Hospital, Saket", criticalWithoutVentilator: "8", criticalWithVentilator: "20", nonCritical: "12" },
            { name: "Rajiv Gandhi Cancer Institute", criticalWithoutVentilator: "20", criticalWithVentilator: "5", nonCritical: "14" },
            { name: "Delhi Heart and Lung Institute", criticalWithoutVentilator: "10", criticalWithVentilator: "13", nonCritical: "17" },
            { name: "Indraprastha Apollo Hospital", criticalWithoutVentilator: "13", criticalWithVentilator: "11", nonCritical: "21" },
            { name: "Metro Hospital & Cancer Institute", criticalWithoutVentilator: "16", criticalWithVentilator: "8", nonCritical: "19" },
            { name: "Venkateshwar Hospital", criticalWithoutVentilator: "12", criticalWithVentilator: "17", nonCritical: "23" },
            { name: "Aakash Healthcare", criticalWithoutVentilator: "7", criticalWithVentilator: "22", nonCritical: "15" },
            { name: "Garg Hospital", criticalWithoutVentilator: "19", criticalWithVentilator: "14", nonCritical: "10" },
            { name: "Kailash Hospital", criticalWithoutVentilator: "21", criticalWithVentilator: "6", nonCritical: "26" },
            { name: "Marengo Asia Hospitals, Gurugram", criticalWithoutVentilator: "9", criticalWithVentilator: "19", nonCritical: "13" },
            { name: "Saroj Super Speciality Hospital", criticalWithoutVentilator: "17", criticalWithVentilator: "12", nonCritical: "28" },
            { name: "Shree Aggarsain International Hospital", criticalWithoutVentilator: "14", criticalWithVentilator: "18", nonCritical: "22" },
            { name: "Max Super Speciality Hospital, Shalimar bagh", criticalWithoutVentilator: "11", criticalWithVentilator: "10", nonCritical: "20" },
            { name: "Jaypee Hospital", criticalWithoutVentilator: "13", criticalWithVentilator: "9", nonCritical: "24" },
            { name: "Mediwell Hospital", criticalWithoutVentilator: "8", criticalWithVentilator: "14", nonCritical: "19" },
            { name: "Puspanjali Crosslay Hospital", criticalWithoutVentilator: "6", criticalWithVentilator: "16", nonCritical: "22" },
            { name: "Yashoda Super Speciality Hospital", criticalWithoutVentilator: "11", criticalWithVentilator: "10", nonCritical: "30" },
            { name: "Narayana Superspeciality Hospital", criticalWithoutVentilator: "12", criticalWithVentilator: "20", nonCritical: "15" },
            { name: "Satyabhama Hospital", criticalWithoutVentilator: "9", criticalWithVentilator: "12", nonCritical: "21" },
            { name: "BLK Hospital", criticalWithoutVentilator: "14", criticalWithVentilator: "11", nonCritical: "18" },
            { name: "Nightingale Hospital", criticalWithoutVentilator: "17", criticalWithVentilator: "6", nonCritical: "25" },
            { name: "Asian Institute of Medical Sciences", criticalWithoutVentilator: "15", criticalWithVentilator: "13", nonCritical: "20" },
            { name: "Bhagwan Mahavir Hospital", criticalWithoutVentilator: "10", criticalWithVentilator: "9", nonCritical: "18" },
            { name: "Chirag Hospital", criticalWithoutVentilator: "12", criticalWithVentilator: "14", nonCritical: "22" },
            { name: "Gurgaon Medicity", criticalWithoutVentilator: "8", criticalWithVentilator: "17", nonCritical: "30" },
            { name: "Ganga Ram Hospital", criticalWithoutVentilator: "11", criticalWithVentilator: "9", nonCritical: "27" }
        ];

        // Populate table with bed availability data
        const tbody = document.querySelector('#bedTable tbody');
        tbody.innerHTML = '';
        bedsData.forEach(bed => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${bed.name}</td>
                <td>${bed.criticalWithoutVentilator}</td>
                <td>${bed.criticalWithVentilator}</td>
                <td>${bed.nonCritical}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    function populateHospitalOptions() {
        // Populate hospital options for admitting a patient
        const hospitals = [
            "AIIMS Delhi", "Fortis Hospital, Shalimar Bagh", "Apollo Hospital",
            "Sir Ganga Ram Hospital", "BLK Super Speciality Hospital", "Medanta - The Medicity",
            "Max Super Speciality Hospital, Saket", "Rajiv Gandhi Cancer Institute",
            "Delhi Heart and Lung Institute", "Indraprastha Apollo Hospital",
            "Metro Hospital & Cancer Institute", "Venkateshwar Hospital",
            "Aakash Healthcare", "Garg Hospital", "Kailash Hospital",
            "Marengo Asia Hospitals, Gurugram", "Saroj Super Speciality Hospital",
            "Shree Aggarsain International Hospital", "Max Super Speciality Hospital, Shalimar bagh",
            "Jaypee Hospital", "Mediwell Hospital", "Puspanjali Crosslay Hospital",
            "Yashoda Super Speciality Hospital", "Narayana Superspeciality Hospital",
            "Satyabhama Hospital", "BLK Hospital", "Nightingale Hospital",
            "Asian Institute of Medical Sciences", "Bhagwan Mahavir Hospital",
            "Chirag Hospital", "Gurgaon Medicity", "Ganga Ram Hospital", "Kailash Hospital Noida",
            "Kumar Hospital", "Sushrut Hospital", "Gautam Hospital", "Rohilkhand Medical College & Hospital",
            "Shree Ram Hospital", "Sushruta Hospital", "Noble Hospital", "Sanjeevani Hospital",
            "St. Stephen's Hospital", "Vikram Hospital", "W Pratiksha Hospital", "Shalimar Hospital"
        ];

        hospitalSelect.innerHTML = '<option value="" disabled selected>Select a hospital</option>';
        hospitals.forEach(hospital => {
            const option = document.createElement('option');
            option.value = hospital;
            option.textContent = hospital;
            hospitalSelect.appendChild(option);
        });
    }

    function admitPatient(name, hospital) {
        // Simulate admitting a patient
        alert(`Patient ${name} admitted to ${hospital}`);
        document.getElementById('admitForm').reset();
    }
});