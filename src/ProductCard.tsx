//@ts-nocheck
import { Card, Image, Flex } from 'antd';
import {
  FileExclamationOutlined,
  DownloadOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import CheckoutForm from './CheckoutForm.tsx';

function buy(id: string) {
  const domain = window.location.origin;
  fetch(`${domain}/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      products: [id],
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch((e) => {
      console.error(e.error);
    });
}

function PartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      width="20"
      fill="currentColor"
    >
      <path d="M32.95 12.303s-.03-.07-.04-.1c-.03-.07-.06-.14-.1-.2l-.07-.1a.673.673 0 0 0-.14-.15.392.392 0 0 0-.1-.08c-.02-.01-.03-.03-.06-.05-.04-.03-.09-.05-.14-.07-.02-.01-.04-.03-.07-.04l-4.15-1.7V5.86c0-.12-.02-.2-.05-.26-.25-1.28-1.43-2.15-2.53-2.65-1.35-.61-3.13-.961-5.02-.961-1.89 0-3.67.35-5.02.96-1.11.5-2.29 1.37-2.53 2.651-.03.06-.05.14-.05.26v3.541l-5.12 2.11s-.02 0-.03.01c-.44.19-.73.63-.73 1.1v19.336c0 .49.3.93.75 1.12l11.77 4.832h.03c.05.02.1.03.15.04.05.01.09.03.14.03h.3c.05 0 .09-.02.14-.03.05-.01.1-.02.15-.04h.03l11.77-4.831c.46-.19.75-.63.75-1.12V12.632c0-.11-.02-.22-.05-.33h.02ZM16.5 5.15c.96-.44 2.37-.74 4-.74s3.04.3 4 .74c1.06.48 1.16.91 1.16.95 0 .04-.09.47-1.16.95-.96.44-2.37.74-4 .74s-3.04-.3-4-.74c-1.06-.48-1.16-.91-1.16-.95 0-.04.09-.47 1.16-.95Zm-1.16 4.041s.09.04.13.06c1.35.61 3.13.96 5.02.96 1.89 0 3.67-.35 5.02-.96.04-.02.08-.04.13-.06v.54s-.09.47-1.16.95c-.96.44-2.37.74-4 .74s-3.04-.3-4-.74c-1.06-.48-1.16-.91-1.16-.95v-.54h.02Zm-1.62 2.5c.49.52 1.13.91 1.75 1.191 1.35.61 3.13.96 5.02.96 1.89 0 3.67-.35 5.02-.96.5-.23 1.02-.53 1.45-.91l1.62.66-8.58 3.52-8.58-3.52 2.3-.95v.01Zm-4.27 2.751 9.32 3.832v16.714l-9.32-3.83V14.442Zm21.1 16.715-9.32 3.831V18.275s5.33-2.191 8.58-3.521l.74-.3v16.714-.01Z" />
    </svg>
  );
}

function currencyFormat(num: number) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function ProductCard({
  id,
  title,
  src,
  partCount,
  signupEvent,
  loading,
  price,
}: productProps) {
  return (
    <Card
      loading={loading}
      extra={
        <>
          {price == 0 ? (
            <a onClick={signupEvent}>
              Get Free <DownloadOutlined />
            </a>
          ) : (
            <a>
              <CheckoutForm id={id}></CheckoutForm>
            </a>
          )}
        </>
      }
      style={{ width: 300, overflow: 'hidden' }}
      cover={<Image src={src} alt={title} title={title}></Image>}
    >
      <Card.Meta title={title}></Card.Meta>
      <Flex gap="10px" justify="center" style={{ padding: '5px' }}>
        <Flex gap="5px">
          <PartIcon /> {partCount} Parts
        </Flex>
        <Flex gap="5px">
          <FileExclamationOutlined /> Instructions only
        </Flex>
      </Flex>
      <p style={{ fontWeight: 'bold', margin: 0, padding: 0 }}>
        {currencyFormat(price / 100)}
      </p>
    </Card>
  );
}
