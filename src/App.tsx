import './App.css';
import { Button, ConfigProvider, Card } from 'antd';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import { Image } from 'antd';
import { Flex } from 'antd';
import {
  ArrowRightOutlined,
  BuildOutlined,
  FileExclamationOutlined,
} from '@ant-design/icons';
import { magenta } from '@ant-design/colors';

function App() {
  const url = 'https://jimmy-blanck.kit.com/04e00b1c2d';

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
        <Content style={{ background: 'white' }}>
          <Flex
            wrap={true}
            gap="20px"
            justify="center"
            align="center"
            style={{ borderRadius: '20px', backgroundColor: magenta[1] }}
          >
            <Flex
              vertical={true}
              justify="center"
              align="center"
              gap="10px"
              wrap={true}
              style={{
                maxWidth: '400px',
                padding: '20px',
              }}
            >
              <h1>
                Build Your <br></br>Dream Set
              </h1>
              <p>
                Ever wanted to build something cool that wasn't an official LEGO
                set? Shrimply Bricks makes it easy. We've got custom building
                instructions for a whole variety of themes that you can
                download. You won't find these anywhere else!
              </p>
              <Flex justify="center" align="center" gap="small">
                <a href={url}>
                  <Button
                    type="primary"
                    size="large"
                    style={{ padding: '24px' }}
                  >
                    Get Free Instructions
                    <ArrowRightOutlined></ArrowRightOutlined>
                  </Button>
                </a>
                {/* <Button size="large" style={{ padding: '24px' }}>
                  Learn More
                </Button> */}
              </Flex>
            </Flex>
            <Image preview={false} src="/src/assets/bubba_don.png"></Image>
          </Flex>

          {/* product list */}

          <Flex vertical={true} style={{ padding: '20px' }}>
            <h2>Most Popular Builds</h2>
            <Flex justify="center" gap="10px" wrap={true}>
              <Card
                title="Floating Tiki Bar"
                actions={[<a href={url}>Get Instructions</a>]}
                style={{ width: 300 }}
                cover={
                  <Image src="https://cdn.rebrickable.com/media/thumbs/mocs/moc-196096/445564.png/1000x800.png?1738273833.516188"></Image>
                }
              >
                <Flex gap="5px" justify="center">
                  <BuildOutlined /> 268 Parts
                  <FileExclamationOutlined /> Instructions only
                </Flex>
              </Card>

              <Card
                title="Vending Machine"
                actions={[<a href={url}>Get Instructions</a>]}
                style={{ width: 300 }}
                cover={
                  <Image src="https://cdn.rebrickable.com/media/thumbs/mocs/moc-194726/436269.png/1000x800.png?1738096800.272604"></Image>
                }
              >
                <Flex gap="5px" justify="center">
                  <BuildOutlined /> 96 Parts
                  <FileExclamationOutlined /> Instructions only
                </Flex>
              </Card>

              <Card
                title="Garden Fountain"
                actions={[<a href={url}>Get Instructions</a>]}
                style={{ width: 300 }}
                cover={
                  <Image src="https://cdn.rebrickable.com/media/thumbs/mocs/moc-202320/487066.png/1000x800.png?1737640216.1509137"></Image>
                }
              >
                <Flex gap="5px" justify="center">
                  <BuildOutlined /> 180 Parts
                  <FileExclamationOutlined /> Instructions only
                </Flex>
              </Card>
            </Flex>
          </Flex>
          <br></br>
          <br></br>
          <br></br>
        </Content>

        <Footer>
          <p>
            Copyright © 2025 Momonga Software LLC
            <br></br>
            Disclaimer: LEGO is a trademark of the LEGO Group of companies
            (https://www.lego.com) which does not sponsor, authorize or endorse
            this site.
          </p>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
