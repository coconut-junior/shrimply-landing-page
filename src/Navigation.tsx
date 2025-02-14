import { CollapseProps, MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

const navItems: MenuItem[] = [
  {
    key: '1',
    disabled: true,
    icon: (
      <img
        onClick={() => {
          alert('Do not the shrimp!!');
        }}
        src="./shrimp-icon.png"
        height={48}
      ></img>
    ),
  },
  { key: '2', label: <a href="#productList">Products</a> },
  { key: '3', label: <a href="#about">About</a> },
  { key: '4', label: <a href="#faq">FAQ</a> },
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
            </a>{' '}
            or{' '}
            <a target="_blank" href="https://www.toypro.com/">
              ToyPro
            </a>
          </li>
          <li>Buy common parts from LEGO's Pick a Brick service</li>
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
        A MOC (My Own Creation) is a custom LEGO creation designed from scratch
        by LEGO enthusiasts rather than an official LEGO set.
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
        If you're not willing to pay full price for genuine LEGO parts, we have
        a solution for you! There are many LEGO compatible part vendors that
        offer high quality parts at a fraction of the price.
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

export { faqItems, navItems };
