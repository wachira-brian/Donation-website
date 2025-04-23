$(document).ready(function() {
    // Handle form submission
    $('#donationForm').submit(function(event) {
        event.preventDefault();
        let name = $('#name').val().trim();
        let amount = $('#amount').val();

        if (!amount || amount <= 0) {
            $('#error').text('Please enter a valid amount.').show();
            $('#success').hide();
            return;
        }

        $.ajax({
            url: '/donate',
            type: 'POST',
            data: { name: name, amount: amount },
            success: function(response) {
                $('#success').text(response.message).show();
                $('#error').hide();
                $('#donationForm')[0].reset();
                updateStats(); // Refresh stats after donation
            },
            error: function(xhr) {
                $('#error').text(xhr.responseJSON.message || 'Donation failed.').show();
                $('#success').hide();
            }
        });
    });

    // Update total and recent donations
    function updateStats() {
        $.get('/total_donations', function(data) {
            $('#total').text(data.total.toFixed(2));
        });
        $.get('/recent_donations', function(data) {
            $('#recent-donations').empty();
            data.forEach(donation => {
                $('#recent-donations').append(
                    `<li>${donation.name} donated $${donation.amount.toFixed(2)}</li>`
                );
            });
        });
    }

    // Poll for updates every 10 seconds
    setInterval(updateStats, 10000);
    updateStats(); // Initial load
});