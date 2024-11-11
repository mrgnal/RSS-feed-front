const API_URL = 'http://127.0.0.1:8000/api';

export async function createPayPalPayment(amount: number, currency: string = 'USD') {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        throw new Error('User data not found');
      }
  
      const user = JSON.parse(userData);
      const userId = user.id;
  
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found');
      }
  
      const response = await fetch(`${API_URL}/payments/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          user_id: userId,
          amount: amount,
          currency: currency
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment creation failed');
      }
  
      const paymentData = await response.json();
      
      sessionStorage.setItem('pendingPayment', JSON.stringify({
        payment_id: paymentData.payment_id,
        amount: amount,
        currency: currency,
        created_at: new Date().toISOString()
      }));
  

      return paymentData.approval_url;
  
    } catch (error) {
      console.error('Payment Creation Error:', error);
      throw error;
    }
  }
  

  export function getPendingPayment() {
    const pendingPayment = sessionStorage.getItem('pendingPayment');
    return pendingPayment ? JSON.parse(pendingPayment) : null;
  }
  

  export function clearPendingPayment() {
    sessionStorage.removeItem('pendingPayment');
  }