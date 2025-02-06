import './App.css';
import {
  Button,
  ConfigProvider,
  Layout,
  Image,
  Flex,
  Collapse,
  Modal,
  Menu,
} from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import { ArrowRightOutlined } from '@ant-design/icons';
import { magenta } from '@ant-design/colors';
import { ProductCard } from './ProductCard.tsx';
import { useState, useEffect } from 'react';
import { Popup } from './Popup.tsx';
import { faqItems, navItems } from './Navigation.tsx';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const ProductList = () => {
    return (
      <Flex id="productList" justify="center" gap="10px" wrap={true}>
        {
          //@ts-expect-error
          products.data.map((product) => (
            <ProductCard
              title={product.name}
              src={product.images[0]}
              partCount={0}
              signupEvent={showModal}
              loading={loading}
              price={0}
            ></ProductCard>
          ))
        }
      </Flex>
    );
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#000000',
        },
      }}
    >
      <Layout>
        <Menu
          mode="horizontal"
          items={navItems}
          style={{
            justifyContent: 'center',
            border: 'none',
            padding: '10px',
            paddingTop: '20px',
          }}
        ></Menu>
        <Content id="wrapper">
          {/* hero */}
          <Flex
            id="hero"
            wrap={true}
            gap="40px"
            justify="center"
            align="center"
            style={{
              backgroundColor: magenta[1],
              marginBottom: 80,
            }}
          >
            <Flex
              vertical={true}
              justify="center"
              align="center"
              gap="10px"
              wrap={true}
              style={{
                maxWidth: '450px',
                padding: '20px',
              }}
            >
              <h1>
                Build Your <br></br>Dream Set
              </h1>
              <p>
                Ever wanted to build something cool that wasn't an official LEGO
                set? Prismaprawn Digital makes it easy. We've got custom
                building instructions for a whole variety of themes that you can
                choose from. These unique builds can't be found anywhere else!
              </p>
              <Flex
                justify="left"
                align="center"
                gap="small"
                wrap={true}
                style={{ width: '100%' }}
              >
                <Button
                  onClick={showModal}
                  type="primary"
                  size="large"
                  style={{ padding: '24px' }}
                >
                  Get Free Instructions
                  <ArrowRightOutlined></ArrowRightOutlined>
                </Button>
                <a href="#products">
                  <Button size="large" style={{ padding: '24px' }}>
                    Browse All
                  </Button>
                </a>
              </Flex>
            </Flex>
            <Image
              id="hero-image"
              preview={false}
              style={{ position: 'relative', top: '100px' }}
              src="./bubba_don.png"
            ></Image>
          </Flex>

          {/* product list */}

          <Flex vertical={true} style={{ padding: '20px' }}>
            <h2 id="products">Most Popular Builds</h2>

            {
              <ProductList></ProductList>
              /* <ProductCard
                title="Vending Machine"
                src="vending_machine_1000x800.png"
                partCount={96}
                signupEvent={showModal}
                loading={loading}
                price={0}
              ></ProductCard>

              <ProductCard
                title="Floating Tiki Bar"
                src="tiki_bar_1000x800.png"
                partCount={268}
                signupEvent={showModal}
                loading={loading}
                price={5.0}
              ></ProductCard>

              <ProductCard
                title="Garden Fountain"
                src="garden_fountain.png"
                partCount={180}
                signupEvent={showModal}
                loading={loading}
                price={4}
              ></ProductCard> */
            }
          </Flex>

          <Flex vertical={true} style={{ padding: '20px' }}>
            <h2 id="about">About</h2>
            <p>
              Founded by lifelong LEGO enthusiasts, Prismaprawn Digital began as
              a passion project in 2024 when we noticed a gap in the market for
              original, high-quality LEGO MOC (My Own Creation) instructions.
              Frustrated by the lack of unique designs that challenged
              traditional building techniques, we set out to craft instructions
              that inspire creativity and redefine what’s possible with LEGO
              bricks.
            </p>

            <h3>What Makes Us Unique</h3>
            <ul>
              <li>
                100% Original Designs: Unlike platforms that resell third-party
                instructions, every MOC is conceptualized, tested, and refined
                by our in-house team.
              </li>
              <li>
                Quality Assurance: Each instruction undergoes rigorous testing
                for clarity, stability, and fun factor—ensuring a rewarding
                building experience.
              </li>
            </ul>
          </Flex>

          <Flex vertical={true} style={{ padding: '20px' }}>
            <h2 id="faq">Frequently Asked Questions</h2>
            <Collapse items={faqItems} style={{ fontSize: '18px' }}></Collapse>
          </Flex>
          <br></br>
          <br></br>
          <br></br>
        </Content>

        <Footer>
          <p>
            Copyright © 2025 Prismaprawn Digital LLC
            <br></br>
            Disclaimer: LEGO is a trademark of the LEGO Group of companies
            (https://www.lego.com) which does not sponsor, authorize or endorse
            this site.
          </p>
        </Footer>
      </Layout>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered={true}
        mask={true}
        wrapClassName="modal"
        width={'700px'}
      >
        <script src="https://f.convertkit.com/ckjs/ck.5.js"></script>
        <Popup></Popup>
      </Modal>
    </ConfigProvider>
  );
}

export default App;
