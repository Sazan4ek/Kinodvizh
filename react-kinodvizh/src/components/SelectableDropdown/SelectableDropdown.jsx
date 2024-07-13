import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';

function SelectableDropdown({options, title})
{
    <Dropdown
      menu={{
        options,
        selectable: true,
        defaultSelectedKeys: ['1'],
      }}
    >
      <Typography.Link>
        <Space>
          {title}
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
}
export default SelectableDropdown;