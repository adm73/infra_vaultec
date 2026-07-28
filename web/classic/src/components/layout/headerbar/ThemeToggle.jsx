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

import React, { useMemo } from 'react';
import { Button, Dropdown } from '@douyinfe/semi-ui';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useActualTheme } from '../../../context/Theme';

const ThemeToggle = ({ theme, onThemeToggle, t }) => {
  const actualTheme = useActualTheme();

  const themeOptions = useMemo(
    () => [
      {
        key: 'light',
        icon: <Sun size={18} />,
        buttonIcon: <Sun size={18} />,
        label: t('浅色模式'),
        description: t('始终使用浅色主题'),
      },
      {
        key: 'dark',
        icon: <Moon size={18} />,
        buttonIcon: <Moon size={18} />,
        label: t('深色模式'),
        description: t('始终使用深色主题'),
      },
      {
        key: 'auto',
        icon: <Monitor size={18} />,
        buttonIcon: <Monitor size={18} />,
        label: t('自动模式'),
        description: t('跟随系统主题设置'),
      },
    ],
    [t],
  );

  const getItemClassName = (isSelected) =>
    isSelected
      ? '!bg-[#fff1df] !font-semibold'
      : 'hover:!bg-[#fff7ef]';

  const currentButtonIcon = useMemo(() => {
    const currentOption = themeOptions.find((option) => option.key === theme);
    return currentOption?.buttonIcon || themeOptions[2].buttonIcon;
  }, [theme, themeOptions]);

  return (
    <Dropdown
      position='bottomRight'
      render={
        <Dropdown.Menu className='!rounded-2xl !border !border-[#e4c8a8]/55 !bg-white !shadow-[0_20px_50px_rgba(188,145,96,0.16)]'>
          {themeOptions.map((option) => (
            <Dropdown.Item
              key={option.key}
              icon={option.icon}
              onClick={() => onThemeToggle(option.key)}
              className={`!text-[#5b3923] ${getItemClassName(theme === option.key)}`}
            >
              <div className='flex flex-col'>
                <span>{option.label}</span>
                <span className='text-xs text-[#8f6848]'>
                  {option.description}
                </span>
              </div>
            </Dropdown.Item>
          ))}

          {theme === 'auto' && (
            <>
              <Dropdown.Divider />
              <div className='px-3 py-2 text-xs text-[#8f6848]'>
                {t('当前跟随系统')}：
                {actualTheme === 'dark' ? t('深色') : t('浅色')}
              </div>
            </>
          )}
        </Dropdown.Menu>
      }
    >
      <span className='inline-flex'>
        <Button
          icon={currentButtonIcon}
          aria-label={t('切换主题')}
          theme='borderless'
          type='tertiary'
          className='!rounded-full !border !border-[#e4c8a8]/45 !bg-[#fffaf4] !p-1.5 !text-[#7b5438] hover:!bg-[#fff1df] hover:!text-[#4a2a16] focus:!bg-[#fff1df]'
        />
      </span>
    </Dropdown>
  );
};

export default ThemeToggle;
