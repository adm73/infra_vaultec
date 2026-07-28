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
import { useTranslation } from 'react-i18next';
import DocumentRenderer from '../../components/common/DocumentRenderer';

const UserAgreement = () => {
  const { t } = useTranslation();

  return (
    <>
      <DocumentRenderer
        apiEndpoint='/api/user-agreement'
        title={t('用户协议')}
        cacheKey='user_agreement'
        emptyMessage={t('加载用户协议内容失败...')}
      />
      <div className='py-4 text-center text-[3px] opacity-20'>
        <a
          href='https://github.com/QuantumNous/new-api'
          target='_blank'
          rel='noopener noreferrer'
          className='!text-semi-color-text-3 hover:opacity-60 transition-opacity'
        >
          Frontend design and development by New API contributors.
        </a>
      </div>
    </>
  );
};

export default UserAgreement;
