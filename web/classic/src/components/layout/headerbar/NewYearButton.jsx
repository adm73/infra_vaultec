/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React from 'react';
import { Button, Dropdown } from '@douyinfe/semi-ui';
import fireworks from 'react-fireworks';

const NewYearButton = ({ isNewYear }) => {
  if (!isNewYear) {
    return null;
  }

  const handleNewYearClick = () => {
    fireworks.init('root', {});
    fireworks.start();
    setTimeout(() => {
      fireworks.stop();
    }, 3000);
  };

  return (
    <Dropdown
      position='bottomRight'
      render={
        <Dropdown.Menu className='!rounded-2xl !border !border-[#e4c8a8]/55 !bg-white !shadow-[0_20px_50px_rgba(188,145,96,0.16)]'>
          <Dropdown.Item
            onClick={handleNewYearClick}
            className='!text-[#5b3923] hover:!bg-[#fff7ef]'
          >
            Happy New Year!!! 🎉
          </Dropdown.Item>
        </Dropdown.Menu>
      }
    >
      <Button
        theme='borderless'
        type='tertiary'
        icon={<span className='text-xl'>🎉</span>}
        aria-label='New Year'
        className='!rounded-full !border !border-[#e4c8a8]/45 !bg-[#fffaf4] !p-1.5 !text-[#7b5438] hover:!bg-[#fff1df] focus:!bg-[#fff1df]'
      />
    </Dropdown>
  );
};

export default NewYearButton;
