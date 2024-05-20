document.getElementById('appointmentForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const serviceId = document.getElementById('serviceDropdown').value;
    const appointmentDate = document.getElementById('appointmentDate').value;

    if(!serviceId || !appointmentDate) {
        alert('Please select a service and data/time for the appointment.');
        return;
    }

    const response = await fetch('/appointments/create', {
        method: 'POST',
        body: JSON.stringify({
            service_ID: serviceId,
            appointmentDate: appointmentDate
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });

    if(response.ok){
        alert('Appointment successfully created! You can view it under the My Appointments tab.');
        document.location.replace('/appointments/all');
    } else {
        const errorMessage = await response.text();
        alert('Failed to create appointment: ' + errorMessage);
    }
})
   
