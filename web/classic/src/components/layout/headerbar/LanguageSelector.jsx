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
import { Languages } from 'lucide-react';

const LanguageSelector = ({ currentLang, onLanguageChange, t }) => {
  return (
    <Dropdown
      position='bottomRight'
      render={
        <Dropdown.Menu className='!rounded-2xl !border !border-[#e4c8a8]/55 !bg-white !shadow-[0_20px_50px_rgba(188,145,96,0.16)]'>
          {/* Language sorting: Order by English name (Chinese, English, French, Japanese, Russian) */}
          <Dropdown.Item
            onClick={() => onLanguageChange('zh-CN')}
            className={`!px-3 !py-1.5 !text-sm !text-[#5b3923] ${currentLang === 'zh-CN' ? '!bg-[#fff1df] !font-semibold' : 'hover:!bg-[#fff7ef]'}`}
          >
            简体中文
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => onLanguageChange('zh-TW')}
            className={`!px-3 !py-1.5 !text-sm !text-[#5b3923] ${currentLang === 'zh-TW' ? '!bg-[#fff1df] !font-semibold' : 'hover:!bg-[#fff7ef]'}`}
          >
        	繁體中文
          </Dropdown.Item>          <Dropdown.Item
            onClick={() => onLanguageChange('en')}
            className={`!px-3 !py-1.5 !text-sm !text-[#5b3923] ${currentLang === 'en' ? '!bg-[#fff1df] !font-semibold' : 'hover:!bg-[#fff7ef]'}`}
          >
            English
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => onLanguageChange('fr')}
            className={`!px-3 !py-1.5 !text-sm !text-[#5b3923] ${currentLang === 'fr' ? '!bg-[#fff1df] !font-semibold' : 'hover:!bg-[#fff7ef]'}`}
          >
            Français
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => onLanguageChange('ja')}
            className={`!px-3 !py-1.5 !text-sm !text-[#5b3923] ${currentLang === 'ja' ? '!bg-[#fff1df] !font-semibold' : 'hover:!bg-[#fff7ef]'}`}
          >
            日本語
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => onLanguageChange('ru')}
            className={`!px-3 !py-1.5 !text-sm !text-[#5b3923] ${currentLang === 'ru' ? '!bg-[#fff1df] !font-semibold' : 'hover:!bg-[#fff7ef]'}`}
          >
            Русский
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => onLanguageChange('vi')}
            className={`!px-3 !py-1.5 !text-sm !text-[#5b3923] ${currentLang === 'vi' ? '!bg-[#fff1df] !font-semibold' : 'hover:!bg-[#fff7ef]'}`}
          >
            Tiếng Việt
          </Dropdown.Item>
        </Dropdown.Menu>
      }
    >
      <Button
        icon={<Languages size={18} />}
        aria-label={t('common.changeLanguage')}
        theme='borderless'
        type='tertiary'
        className='!rounded-full !border !border-[#e4c8a8]/45 !bg-[#fffaf4] !p-1.5 !text-[#7b5438] hover:!bg-[#fff1df] hover:!text-[#4a2a16] focus:!bg-[#fff1df]'
      />
    </Dropdown>
  );
};

export default LanguageSelector;
