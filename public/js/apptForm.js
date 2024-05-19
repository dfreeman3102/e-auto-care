document.getElementById('appointmentForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const serviceId = document.getElementById('serviceDropdown').value;
    const appointmentDate = document.getElementById('appointmentDate').value;

    if(!serviceId || !appointmentDate) {
        alert('Please select a service and data/time for the appointment.');
        return;
    }

    const response = await fetch('/appointment/all', {
        method: 'POST',
        body: JSON.stringify({
            serviceId: serviceId,
            appointmentDate: appointmentDate
        }),
        headers: {
            'Content-Type': application/json
        }

    });

    if(response.ok){
        alert('Appointment successfully created!You can view it under the My Appointments tab.');
        window.location.reload();
    } else {
        const errorMessage = await response.text();
        alert('Failed to create appointment: ', errorMessage);
    }
})
   
