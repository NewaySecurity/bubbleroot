// PayPal Integration for BubbleRoot Studios
// This file handles PayPal payments for various services

class PayPalPayments {
    constructor(clientId) {
        this.clientId = clientId;
        this.isLoaded = false;
        this.init();
    }

    async init() {
        // Load PayPal SDK
        if (!document.getElementById('paypal-sdk')) {
            const script = document.createElement('script');
            script.id = 'paypal-sdk';
            script.src = `https://www.paypal.com/sdk/js?client-id=${this.clientId}&currency=ZAR&components=buttons&locale=en_ZA`;
            script.onload = () => {
                this.isLoaded = true;
                // Add a small delay to ensure DOM is ready
                setTimeout(() => {
                    this.initializePaymentButtons();
                }, 500);
            };
            script.onerror = () => {
                console.error('Failed to load PayPal SDK');
            };
            document.head.appendChild(script);
        }
    }

    initializePaymentButtons() {
        // Service pricing (in ZAR)
        this.servicePrices = {
            'logo-design': { amount: '500.00', description: 'Professional Logo Design' },
            'website-basic': { amount: '2500.00', description: 'Basic Website Development' },
            'website-premium': { amount: '5000.00', description: 'Premium Website Development' },
            'branding-package': { amount: '1500.00', description: 'Complete Branding Package' },
            'social-media': { amount: '800.00', description: 'Social Media Content Creation' },
            'business-cards': { amount: '200.00', description: 'Business Card Design & Print' },
            'flyer-design': { amount: '300.00', description: 'Professional Flyer Design' },
            'consultation': { amount: '150.00', description: 'Business Consultation (1 hour)' }
        };

        // Create payment buttons for each service
        this.createServicePaymentButtons();
        this.createCustomPaymentForm();
    }

    createServicePaymentButtons() {
        const servicesContainer = document.querySelector('.services-grid');
        if (!servicesContainer) return;

        // Add payment buttons to service cards
        const serviceCards = servicesContainer.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            const serviceKey = this.getServiceKey(index);
            if (serviceKey && this.servicePrices[serviceKey]) {
                this.addPaymentButtonToCard(card, serviceKey);
            }
        });
    }

    getServiceKey(index) {
        const serviceMap = {
            0: 'logo-design',      // Creative Services
            1: 'business-cards',   // Printing & Branding
            2: 'website-basic',    // Web Development
            3: 'social-media',     // Digital Marketing
            4: 'consultation',     // Business Admin
            5: 'consultation'      // Technology & IT
        };
        return serviceMap[index];
    }

    addPaymentButtonToCard(card, serviceKey) {
        const service = this.servicePrices[serviceKey];
        
        // Add pricing info
        const priceDiv = document.createElement('div');
        priceDiv.className = 'service-price';
        priceDiv.innerHTML = `
            <p class="price">From R${service.amount}</p>
            <div class="payment-button" id="paypal-button-${serviceKey}"></div>
        `;
        
        card.appendChild(priceDiv);

        // Initialize PayPal button
        if (window.paypal) {
            this.renderPayPalButton(`paypal-button-${serviceKey}`, service);
        }
    }

    renderPayPalButton(containerId, service) {
        // Validate amount before rendering
        const amount = parseFloat(service.amount);
        if (isNaN(amount) || amount <= 0) {
            console.error('Invalid amount:', service.amount);
            return;
        }

        paypal.Buttons({
            style: {
                layout: 'horizontal',
                color: 'blue',
                shape: 'rect',
                label: 'pay',
                height: 40
            },
            createOrder: (data, actions) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [{
                        amount: {
                            currency_code: 'ZAR',
                            value: amount.toFixed(2)
                        },
                        description: service.description,
                        custom_id: `BUBBLEROOT-${Date.now()}`,
                        soft_descriptor: 'BUBBLEROOT'
                    }],
                    application_context: {
                        brand_name: 'BubbleRoot Studios',
                        locale: 'en-ZA',
                        landing_page: 'BILLING',
                        user_action: 'PAY_NOW'
                    }
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then((details) => {
                    this.handleSuccessfulPayment(details, service);
                }).catch((error) => {
                    console.error('Payment capture failed:', error);
                    alert('Payment processing failed. Please contact us to verify your payment.');
                });
            },
            onError: (err) => {
                console.error('PayPal Error:', err);
                this.handlePaymentError(err);
            },
            onCancel: (data) => {
                console.log('Payment cancelled:', data);
                // User cancelled payment - no action needed
            }
        }).render(`#${containerId}`).catch(err => {
            console.error('PayPal button render failed:', err);
            document.getElementById(containerId).innerHTML = '<p style="color: #e74c3c; font-size: 0.9rem;">Payment unavailable. Please contact us directly.</p>';
        });
    }

    createCustomPaymentForm() {
        // Add custom payment form to contact section
        const contactSection = document.querySelector('#contact .contact-content');
        if (!contactSection) return;

        const paymentForm = document.createElement('div');
        paymentForm.className = 'payment-form';
        paymentForm.innerHTML = `
            <div class="payment-section">
                <h3>Quick Payment</h3>
                <p>Pay for services or make a deposit</p>
                
                <div class="quick-services">
                    <h4>Popular Services</h4>
                    <div class="service-options">
                        <button class="service-option" data-service="logo-design">
                            Logo Design - R500
                        </button>
                        <button class="service-option" data-service="website-basic">
                            Basic Website - R2,500
                        </button>
                        <button class="service-option" data-service="branding-package">
                            Branding Package - R1,500
                        </button>
                    </div>
                </div>

                <div class="custom-amount">
                    <h4>Custom Amount</h4>
                    <div class="amount-input">
                        <label>Amount (ZAR):</label>
                        <input type="number" id="custom-amount" min="50" step="10" placeholder="Enter amount">
                        <input type="text" id="custom-description" placeholder="Description (optional)">
                    </div>
                </div>

                <div id="paypal-button-custom" class="paypal-custom-button"></div>
            </div>
        `;

        // Insert payment form
        contactSection.appendChild(paymentForm);

        // Add event listeners
        this.setupPaymentFormEvents();
    }

    setupPaymentFormEvents() {
        // Service option buttons
        document.querySelectorAll('.service-option').forEach(button => {
            button.addEventListener('click', (e) => {
                const serviceKey = e.target.dataset.service;
                const service = this.servicePrices[serviceKey];
                
                // Clear custom amount
                document.getElementById('custom-amount').value = '';
                document.getElementById('custom-description').value = '';
                
                // Render PayPal button for selected service
                this.renderCustomPayPalButton(service);
            });
        });

        // Custom amount input
        document.getElementById('custom-amount').addEventListener('input', (e) => {
            const amount = e.target.value;
            const description = document.getElementById('custom-description').value || 'Custom Payment';
            
            if (amount && amount >= 50) {
                const customService = {
                    amount: parseFloat(amount).toFixed(2),
                    description: description
                };
                this.renderCustomPayPalButton(customService);
            }
        });
    }

    renderCustomPayPalButton(service) {
        const container = document.getElementById('paypal-button-custom');
        container.innerHTML = ''; // Clear existing button

        // Validate amount
        const amount = parseFloat(service.amount);
        if (isNaN(amount) || amount < 50) {
            container.innerHTML = '<p style="color: #e74c3c; font-size: 0.9rem;">Please enter a valid amount (minimum R50)</p>';
            return;
        }

        paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'pay',
                height: 55
            },
            createOrder: (data, actions) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [{
                        amount: {
                            currency_code: 'ZAR',
                            value: amount.toFixed(2)
                        },
                        description: service.description,
                        custom_id: `BUBBLEROOT-${Date.now()}`,
                        soft_descriptor: 'BUBBLEROOT'
                    }],
                    application_context: {
                        brand_name: 'BubbleRoot Studios',
                        locale: 'en-ZA',
                        landing_page: 'BILLING',
                        user_action: 'PAY_NOW'
                    }
                });
            },
            onApprove: (data, actions) => {
                return actions.order.capture().then((details) => {
                    this.handleSuccessfulPayment(details, service);
                }).catch((error) => {
                    console.error('Payment capture failed:', error);
                    this.handlePaymentError(error);
                });
            },
            onError: (err) => {
                console.error('PayPal Error:', err);
                this.handlePaymentError(err);
            },
            onCancel: (data) => {
                console.log('Payment cancelled:', data);
            }
        }).render('#paypal-button-custom').catch(err => {
            console.error('PayPal custom button render failed:', err);
            container.innerHTML = '<p style="color: #e74c3c; font-size: 0.9rem;">Payment unavailable. Please contact us directly.</p>';
        });
    }

    handlePaymentError(error) {
        let errorMessage = 'Payment failed. Please try again.';
        
        if (error && error.details) {
            // Handle specific PayPal errors
            const details = error.details[0];
            if (details && details.issue) {
                switch (details.issue) {
                    case 'CURRENCY_NOT_SUPPORTED':
                        errorMessage = 'Currency not supported. Please contact us for alternative payment methods.';
                        break;
                    case 'INVALID_REQUEST':
                        errorMessage = 'Invalid payment request. Please refresh the page and try again.';
                        break;
                    case 'INSTRUMENT_DECLINED':
                        errorMessage = 'Payment method declined. Please try a different payment method.';
                        break;
                    default:
                        errorMessage = `Payment error: ${details.description || 'Unknown error'}`;
                }
            }
        }
        
        alert(errorMessage + ' If the problem persists, please contact us directly.');
    }

    handleSuccessfulPayment(details, service) {
        // Show success message
        const successModal = this.createSuccessModal(details, service);
        document.body.appendChild(successModal);

        // Send confirmation email (you would implement this server-side)
        this.sendPaymentConfirmation(details, service);

        // Analytics tracking (if you have Google Analytics)
        if (window.gtag) {
            gtag('event', 'purchase', {
                transaction_id: details.id,
                value: service.amount,
                currency: 'ZAR',
                items: [{
                    item_id: service.description.replace(/\s+/g, '-').toLowerCase(),
                    item_name: service.description,
                    category: 'Services',
                    quantity: 1,
                    price: service.amount
                }]
            });
        }
    }

    createSuccessModal(details, service) {
        const modal = document.createElement('div');
        modal.className = 'payment-success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="success-icon">✅</div>
                <h2>Payment Successful!</h2>
                <p><strong>Service:</strong> ${service.description}</p>
                <p><strong>Amount:</strong> R${service.amount}</p>
                <p><strong>Transaction ID:</strong> ${details.id}</p>
                <p>Thank you for your payment! We'll contact you within 24 hours to begin your project.</p>
                <div class="modal-actions">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="btn btn-primary">
                        Close
                    </button>
                    <a href="mailto:info@bubblerootstudios.co.za?subject=Project Start - ${service.description}&body=Hi, I just completed payment for ${service.description} (Transaction: ${details.id}). Please let me know the next steps." class="btn btn-secondary">
                        Contact Us
                    </a>
                </div>
            </div>
        `;
        return modal;
    }

    sendPaymentConfirmation(details, service) {
        // This would typically be handled by your backend
        // For now, we'll just log the payment details
        console.log('Payment Confirmation:', {
            transactionId: details.id,
            service: service.description,
            amount: service.amount,
            currency: 'ZAR',
            payer: details.payer,
            timestamp: new Date().toISOString()
        });

        // You could also send this data to your server using fetch
        // fetch('/api/payment-confirmation', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(paymentData)
        // });
    }
}

// Initialize PayPal when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Use your PayPal Client ID (use sandbox for testing)
    const PAYPAL_CLIENT_ID = 'AQK_cbad0GQid963MwwPUTQp8sig5kHR6etmcGkd1GnXrPIYs7JjHbtO2lGsh9638S6IcnAoc-y1gNVY';
    
    // Initialize PayPal payments
    window.paypalPayments = new PayPalPayments(PAYPAL_CLIENT_ID);
});
