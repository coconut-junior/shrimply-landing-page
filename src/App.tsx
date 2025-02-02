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
import { ProductCard } from './ProductCard.tsx';
import { useState, useEffect } from 'react';
import { Popup } from './Popup.tsx';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  type MenuItem = Required<MenuProps>['items'][number];

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
    { key: '1',disabled:true, icon:<img onClick={()=>{alert('Do not the shrimp!!')}} src = "./shrimp-icon.png" height={48}></img> },
    { key: '2', label:  <a href="#about">About</a> },
    { key: '3', label: <a href="#faq">FAQ</a> }
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
              ,{' '}
              <a target="_blank" href="https://www.brickowl.com/">
                Brick Owl
              </a>
              {' '}or <a target="_blank" href = "https://www.toypro.com/">ToyPro</a>
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
      label: 'LEGO pieces cost too much! What can I do?',
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
                set? Prismaprawn Digital makes it easy. We've got custom building
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
                <a href="#products">
                  <Button size="large" style={{ padding: '24px' }}>
                    Browse All
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
            <h2 id = "products">Most Popular Builds</h2>
            <Flex justify="center" gap="10px" wrap={true}>
            <ProductCard
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
                price={5.00}
              ></ProductCard>

              <ProductCard
                title="Garden Fountain"
                src="garden_fountain.png"
                partCount={180}
                signupEvent={showModal}
                loading={loading}
                price={4}
              ></ProductCard>
            </Flex>
          </Flex>

          <Flex vertical={true} style={{ padding: '20px' }}>
            <h2 id="about">About</h2>
            <p>Founded by lifelong LEGO enthusiasts, Prismaprawn Digital began as a passion project in 2024 when we noticed a gap in the market for original, high-quality LEGO MOC (My Own Creation) instructions. Frustrated by the lack of unique designs that challenged traditional building techniques, we set out to craft instructions that inspire creativity and redefine what’s possible with LEGO bricks.</p>
              
            <h3>What Makes Us Unique</h3>
            <ul>
              <li>100% Original Designs: Unlike platforms that resell third-party instructions, every MOC is conceptualized, tested, and refined by our in-house team.</li>
              <li>Quality Assurance: Each instruction undergoes rigorous testing for clarity, stability, and fun factor—ensuring a rewarding building experience.</li>
             
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

        <Footer >
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
