import './App.css';
import { Button } from 'antd';
import { Layout } from 'antd';
import { Footer, Header } from 'antd/es/layout/layout';
import { Content } from 'antd/es/layout/layout';
import { Image } from 'antd';
import { Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { ArrowRightOutlined } from '@ant-design/icons';

function App() {
  return (
    <>
      <Layout style={{ borderRadius: '20px' }}>
        <Content>
          <Flex wrap={true} gap="20px" justify="center" align="center">
            <Flex vertical={true} justify="center" align="center" gap="10px">
              <Title>Build Your Dreams</Title>
              <p style={{ maxWidth: '400px' }}>
                Ever wanted to build something cool that wasn't an official LEGO
                set? Shrimply Bricks makes it easy. We've got custom building
                instructions for a whole variety of themes that you can
                download. You won't find these anywhere else!
              </p>
              <Flex justify="center" align="center" gap="small">
                <Button type="primary" style={{ padding: '20px' }}>
                  Get Free Instructions
                  <ArrowRightOutlined></ArrowRightOutlined>
                </Button>
                <Button style={{ padding: '20px' }}>Learn More</Button>
              </Flex>
            </Flex>
            <Image src="https://cdn.rebrickable.com/media/thumbs/mocs/moc-200176/471708.png/1000x800.png?1737139837.6408758"></Image>
          </Flex>
        </Content>
      </Layout>
    </>
  );
}

export default App;
