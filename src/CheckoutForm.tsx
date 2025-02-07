'use client';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { useCallback, useState } from 'react';
import { Modal } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';

//@ts-ignore
export default function EmbeddedCheckoutButton({ id }) {
  const stripePromise = loadStripe(
    'pk_test_51Qnmq2RSQY7LvNOekG649ZFpCrvgCv0ObLp9NTuWlvNxyyrIpKX9Jr8rE5MMOHmlMjTwb1YCCAyNjJu5in5UjQIr008Ajy07UU'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch('/api/embedded-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          //@ts-ignore
          { id: id, quantity: 1 },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => data.client_secret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div>
      <a className="btn" onClick={showModal}>
        Buy Now <ShoppingOutlined />
      </a>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        width={'700px'}
        footer={null}
        destroyOnClose={true}
      >
        {isModalOpen && (
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </Modal>
    </div>
  );
}
