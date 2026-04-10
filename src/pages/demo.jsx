import React from 'react';
import PaystackPop from '@paystack/inline-js';

const App = () => {

    const payWithPaystack = () => {
        const paystack = new PaystackPop();

        paystack.newTransaction({
            key: 'pk_test_79140e721119e55e490bb5f1de0b6410bec29471',
            email: 'demo@paystack.com',
            amount: 10000,
            onSuccess: (transaction) => {
                alert(`Successful! Ref: ${transaction.reference}`);
            },
            onCancel: () => {
                alert('Transaction was cancelled');
            }
        });
    };

    return (
        <div>
            <button onClick={payWithPaystack}>Pay</button>
        </div>
    );
};

export default App;