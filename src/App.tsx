import './App.css';
import {
  Button,
  ConfigProvider,
  Layout,
  Image,
  Flex,
  Collapse,
  CollapseProps,
  Modal,
  Menu,
  MenuProps
} from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import { ArrowRightOutlined } from '@ant-design/icons';
import { magenta } from '@ant-design/colors';
import { ProductCard } from './ProductCard';
import { useState, useEffect } from 'react';
import { Popup } from './Popup';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  type MenuItem = Required<MenuProps>['items'][number];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navItems: MenuItem[] = [
    { key: '1',disabled:true, icon:<img src = "./shrimp-icon.png" height={48}></img> },
    // { key: '2', label:  <a href = "mailto:contact@jbx.design">Contact</a> },
    // { key: '3', label: 'Option 3' }
  ];

  const faqItems: CollapseProps['items'] = [
    {
      key: '1',
      label: 'How do I get the parts needed?',
      children: (
        <>
          <p>You have several options:</p>
          <ul>
            
            <li>
              Buy individual parts from online brick stores like{' '}
              <a target="_blank" href="https://www.bricklink.com/v2/main.page">
                BrickLink
              </a>{' '}
              or{' '}
              <a target="_blank" href="https://www.brickowl.com/">
                Brick Owl
              </a>
            </li>
            <li>
              Buy common parts from LEGO's Pick a Brick service
            </li>
            <li>Use parts from your existing LEGO collection</li>
          </ul>
        </>
      ),
    },
    {
      key: '2',
      label: 'What is a LEGO MOC?',
      children: (
        <p>
          A MOC (My Own Creation) is a custom LEGO creation designed from
          scratch by LEGO enthusiasts rather than an official LEGO set.
        </p>
      ),
    },
    {
      key: '3',
      label: 'Is building MOCs expensive?',
      children: (
        <p>
          It depends on how many parts you need to order. We try to design MOCs
          with cost in mind, using the most common parts and offering different
          size MOCs to account for different budgets.
        </p>
      ),
    },
    {
      key: '4',
      label: 'LEGO pieces cost too much!',
      children: (
        <p>
          If you're not willing to pay full price for genuine LEGO parts, we
          have a solution for you! There are many LEGO compatible part vendors
          that offer high quality parts at a fraction of the price.
          <br></br>
          Our recommendation is to try ordering from
          <a target="_blank" href="https://www.webrick.com/">
            {' '}
            Webrick
          </a>
          . They offer excellent prices without compromising on quality.
        </p>
      ),
    },
  ];

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
        <Menu mode = "horizontal" items = {navItems} style = {{justifyContent:'center',border:'none',padding:'10px',paddingTop:'20px'}}></Menu>
        <Content id = 'wrapper'>
          {/* hero */}
          <Flex
            id = "hero"
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
                set? Shrimply Bricks makes it easy. We've got custom building
                instructions for a whole variety of themes that you can choose
                from. These unique builds can't be found anywhere else!
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
                <a href="#faq">
                  <Button size="large" style={{ padding: '24px' }}>
                    Learn More
                  </Button>
                </a>
              </Flex>
            </Flex>
            <Image id = "hero-image"
              preview={false}
              style={{ position: 'relative', top: '100px' }}
              src='./bubba_don.png'
            ></Image>
          </Flex>

          {/* product list */}

          <Flex vertical={true} style={{ padding: '20px' }}>
            <h2>Most Popular Builds</h2>
            <Flex justify="center" gap="10px" wrap={true}>
              <ProductCard
                title="Floating Tiki Bar"
                src="tiki_bar_1000x800.png"
                partCount={268}
                clickEvent={showModal}
                loading={loading}
              ></ProductCard>

              <ProductCard
                title="Vending Machine"
                src="vending_machine_1000x800.png"
                partCount={96}
                clickEvent={showModal}
                loading={loading}
              ></ProductCard>

              <ProductCard
                title="Garden Fountain"
                src="garden_fountain.png"
                partCount={180}
                clickEvent={showModal}
                loading={loading}
              ></ProductCard>
            </Flex>
          </Flex>

          <Flex vertical={true} style={{ padding: '20px' }}>
            <h2 id="faq">Frequently Asked Questions</h2>
            <Collapse items={faqItems} style={{ fontSize: '18px' }}></Collapse>
          </Flex>
          <br></br>
          <br></br>
          <br></br>
        </Content>

        <Footer >
          <p>
            Copyright © 2025 Momonga Software LLC
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
