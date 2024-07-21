//chatbot interface
document.addEventListener('DOMContentLoaded', function() {
    var messageInput = document.getElementById('messageInput');
    var sendButton = document.getElementById('sendButton');

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        var messageText = messageInput.value.trim();

        if (messageText === '') {
            return;
        }

        var messageContainer = document.createElement('div');
        messageContainer.classList.add('message', 'sent');

        var profilePicture = document.createElement('div');
        profilePicture.classList.add('profile-picture');
        var img = document.createElement('img');
        img.src = 'static/img/Popular Anime And Cartoon Characters Made Into Rugs By A Carpet Nerd (32 Pics).jpg';
        img.alt = 'User Avatar';
        profilePicture.appendChild(img);

        var messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = messageText;

        messageContainer.appendChild(profilePicture);
        messageContainer.appendChild(messageContent);

        document.querySelector('.messages').appendChild(messageContainer);

        messageInput.value = '';
        messageInput.focus();

        // Simulate bot response after a short delay
        setTimeout(function() {
            receiveMessage(messageText);
        }, 1000);
    }

    function receiveMessage(userMessage) {
        var messageContainer = document.createElement('div');
        messageContainer.classList.add('message', 'received');

        var profilePicture = document.createElement('div');
        profilePicture.classList.add('profile-picture');
        var img = document.createElement('img');
        img.src = 'static/img/bot_pfp_x2.svg';
        img.alt = 'Bot Avatar';
        profilePicture.appendChild(img);

        var messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        // Determine the response based on the userMessage
        var botResponse = getBotResponse(userMessage);
        messageContent.textContent = botResponse;

        messageContainer.appendChild(profilePicture);
        messageContainer.appendChild(messageContent);

        document.querySelector('.messages').appendChild(messageContainer);
    }

    function getBotResponse(userMessage) {
        var response = 'I\'m not sure I understand. Could you please rephrase that?';

        var responses = {
            'hello': 'Hi there! Genesis here. How can I help you today?',
            'someone wants my account details': 'It\'s always good to be cautious. Make sure you verify who you\'re talking to before sharing any details.',
            'how do i verify identity': 'A great way to verify someone\'s identity is to use two-factor authentication. It adds an extra layer of security.',
            'what to do in case of fraud prevention?': 'If you suspect any fraudulent activity, report it to our fraud prevention team immediately. We\'re here to help!',
            'how to reset my password': 'No worries! You can reset your password by going to the login page and clicking on "Forgot Password." Just follow the instructions in the email we send you.',
            'how to update my payment information': 'You can update your payment details by logging into your account, going to "Payment Methods," and following the steps to update or add new information.',
            'my payment failed': 'Oh no! If your payment didn\'t go through, double-check your payment details and make sure you have enough funds. If you\'re still having trouble, our support team is ready to assist.',
            'how do i view my transaction history': 'You can view all your transactions by logging into your account and heading to the "Transactions" section. Everything should be listed there.',
            'how to cancel a payment': 'To cancel a payment or subscription, go to the "Manage Subscriptions" section of your account. If you need more help, just reach out to our support team.',
            'what is refund processing time': 'Refunds usually take about 5-7 business days to process, depending on your payment method and bank. If it takes longer, just let us know and we\'ll look into it.',
            'how do i contact customer support': 'You can get in touch with our support team through the "Contact Us" page on our website. You can also email us at paytechsupport@gmail.com or call us at 1111-2222-3333.',
            'what are security measures': 'We use top-notch encryption and security protocols to keep your payment information safe. Plus, we continuously monitor for any suspicious activity.',
            'how to change my account email': 'Changing your email is easy. Just log in, go to "Account Settings," and update your email address. You\'ll need to verify the new email to complete the change.'
                // Add more keyword-response pairs as needed
        };

        for (var keyword in responses) {
            if (userMessage.toLowerCase().includes(keyword)) {
                response = responses[keyword];
                break;
            }
        }

        return response;
    }


    document.addEventListener('DOMContentLoaded', function() {
        const navToggle = document.getElementById('nav-toggle');
        const navBar = document.getElementById('nav-bar');
        const mainContent = document.querySelector('.main-content');
        const chatContainer = document.querySelector('.chat-container');

        navToggle.addEventListener('change', function() {
            if (window.innerWidth <= 768) {
                if (navToggle.checked) {
                    navBar.style.zIndex = '9999';
                    mainContent.style.marginLeft = '0';
                    chatContainer.style.marginLeft = '0';
                } else {
                    navBar.style.zIndex = '1';
                }
            } else {
                navBar.style.zIndex = '1';
                if (navToggle.checked) {
                    mainContent.style.marginLeft = 'calc(var(--navbar-width) - 60px)'; // Adjusted value
                    chatContainer.style.marginLeft = 'calc(var(--navbar-width) - 60px)'; // Adjusted value
                } else {
                    mainContent.style.marginLeft = 'var(--navbar-width-min)';
                    chatContainer.style.marginLeft = 'var(--navbar-width-min)';
                }
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navBar.style.zIndex = '1';
                if (navToggle.checked) {
                    mainContent.style.marginLeft = 'calc(var(--navbar-width) - 32px)'; // Adjusted value
                    chatContainer.style.marginLeft = 'calc(var(--navbar-width) - 32px)'; // Adjusted value
                } else {
                    mainContent.style.marginLeft = 'var(--navbar-width-min)';
                    chatContainer.style.marginLeft = 'var(--navbar-width-min)';
                }
            } else {
                mainContent.style.marginLeft = '0';
                chatContainer.style.marginLeft = '0';
            }
        });
    });

    //landing page

    // Smooth scrolling to a section
    document.addEventListener('DOMContentLoaded', function() {
        const heroButton = document.querySelector('.hero .btn-primary');
        heroButton.addEventListener('click', function(event) {
            event.preventDefault();
            const targetSection = document.querySelector('.section-to-scroll-to');
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // JavaScript for feature items interactivity
    document.addEventListener('DOMContentLoaded', function() {
        const featureItems = document.querySelectorAll('.feature-item');

        featureItems.forEach(function(item) {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)'; // Lifts the feature item slightly on hover
                this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)'; // Enhances shadow on hover
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.2)';
            });
        });
    });

    //ticket
    // Sample ticket data
    document.addEventListener('DOMContentLoaded', function() {
        const buttons = document.querySelectorAll('.btn-view');

        buttons.forEach(button => {
            button.addEventListener('click', function() {
                alert('Viewing ticket details...');
            });
        });
    });


    document.addEventListener('DOMContentLoaded', function() {
        const navToggle = document.getElementById('nav-toggle');
        const navBar = document.getElementById('nav-bar');
        const ticketTable = document.querySelector('.ticket-table');
        const ticketcontainer = document.querySelector('.container');

        navToggle.addEventListener('change', function() {
            if (window.innerWidth <= 768) {
                if (navToggle.checked) {
                    navBar.style.zIndex = '9999';
                    ticketTable.style.marginLeft = '0';
                    ticketcontainer.style.marginLeft = '0';
                } else {
                    navBar.style.zIndex = '1';
                }
            } else {
                navBar.style.zIndex = '1';
                if (navToggle.checked) {
                    ticketTable.style.marginLeft = 'calc(var(--navbar-width) - 150px)'; // Adjusted value
                    ticketcontainer.style.marginLeft = 'calc(var(--navbar-width) - 150px)'; // Adjusted value
                } else {
                    ticketTable.style.marginLeft = 'calc(var(--navbar-width-min)-30px)';
                    ticketcontainer.style.marginLeft = 'calc(var(--navbar-width-min)-30px)';
                }
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navBar.style.zIndex = '1';
                if (navToggle.checked) {
                    mainContent.style.marginLeft = 'calc(var(--navbar-width) - 150px)'; // Adjusted value
                    chatContainer.style.marginLeft = 'calc(var(--navbar-width) - 150px)'; // Adjusted value
                } else {
                    mainContent.style.marginLeft = 'calc(var(--navbar-width-min)-30px)';
                    chatContainer.style.marginLeft = 'calc(var(--navbar-width-min)-30px)';
                }
            } else {
                mainContent.style.marginLeft = '0';
                chatContainer.style.marginLeft = '0';
            }
        });
    });

    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });


    document.addEventListener('DOMContentLoaded', () => {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach(shape => {
            shape.style.animationDuration = `${Math.random() * 10 + 10}s`;
        });
    });
});