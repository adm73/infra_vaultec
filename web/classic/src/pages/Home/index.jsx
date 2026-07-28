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

import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  ScrollList,
  ScrollItem,
} from '@douyinfe/semi-ui';
import { API, showError, copy, showSuccess } from '../../helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { API_ENDPOINTS } from '../../constants/common.constant';
import { StatusContext } from '../../context/Status';
import { useActualTheme } from '../../context/Theme';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import { sanitizeHtml } from '../../helpers/sanitize';
import { IconPlay, IconFile, IconCopy } from '@douyinfe/semi-icons';
import { Link } from 'react-router-dom';
import NoticeModal from '../../components/layout/NoticeModal';
import {
  Moonshot,
  OpenAI,
  XAI,
  Zhipu,
  Volcengine,
  Cohere,
  Claude,
  Gemini,
  Suno,
  Minimax,
  Wenxin,
  Spark,
  Qingyan,
  DeepSeek,
  Qwen,
  Midjourney as MjProxyIcon,
  Grok,
  AzureAI,
  Hunyuan,
  Xinference,
} from '@lobehub/icons';

const PROVIDER_ICONS = [
  Moonshot,
  OpenAI,
  XAI,
  Zhipu.Color,
  Volcengine.Color,
  Cohere.Color,
  Claude.Color,
  Gemini.Color,
  Suno,
  Minimax.Color,
  Wenxin.Color,
  Spark.Color,
  Qingyan.Color,
  DeepSeek.Color,
  Qwen.Color,
  MjProxyIcon,
  Grok,
  AzureAI.Color,
  Hunyuan.Color,
  Xinference.Color,
];

const HERO_PROVIDER_LABELS = [
  'OpenAI',
  'Claude',
  'Gemini',
  'Qwen',
  'DeepSeek',
  'Azure',
];

const Home = () => {
  const { t, i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const actualTheme = useActualTheme();
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);
  const isMobile = useIsMobile();
  const isDemoSiteMode = statusState?.status?.demo_site_enabled || false;
  const docsLink = statusState?.status?.docs_link || '';
  const serverAddress =
    statusState?.status?.server_address || `${window.location.origin}`;
  const docsUrl = docsLink || 'https://vaultec.ai';
  const versionTag = statusState?.status?.version || 'Local Build';
  const endpointItems = API_ENDPOINTS.map((e) => ({ value: e }));
  const [endpointIndex, setEndpointIndex] = useState(0);
  const isChinese = i18n.language.startsWith('zh');
  const selectedEndpoint = endpointItems[endpointIndex]?.value || API_ENDPOINTS[0];
  const getFloatStyle = (index, delay = 0, duration = 9) => ({
    animationDelay: `${delay + index * 0.45}s`,
    animationDuration: `${duration + (index % 3)}s`,
  });
  const getRiseStyle = (index, delay = 0.1) => ({
    animationDelay: `${delay + index * 0.08}s`,
  });

  const trustSignals = [
    t('增长型产品团队'),
    t('企业知识助手'),
    t('内部 Copilot'),
    t('客服自动化'),
    t('跨模型工作流'),
  ];

  const quickHighlights = [
    {
      value: '1 API',
      label: t('统一接入层'),
      detail: t('让产品上线无需为每个模型重复改造'),
    },
    {
      value: '30+',
      label: t('主流模型供应商'),
      detail: t('把文本、图像、音频与工作流能力接进同一入口'),
    },
    {
      value: '/console',
      label: t('团队控制台'),
      detail: t('把令牌、路由、渠道与配额集中放回后台'),
    },
    {
      value: 'Self-hosted',
      label: t('企业可控部署'),
      detail: t('把数据、权限和运维节奏留在自己的系统边界内'),
    },
  ];

  const heroSignals = [
    {
      value: '30+',
      label: t('主流模型生态'),
    },
    {
      value: 'OpenAI Compatible',
      label: t('沿用现有 SDK'),
    },
    {
      value: 'Self-hosted',
      label: t('本地掌控部署'),
    },
  ];

  const featureStories = [
    {
      eyebrow: t('Business Ready AI Layer'),
      title: t('让产品团队用一个入口接入主流模型能力，而不是维护多套接入方案'),
      description: t('把模型试点、上线与切换放进同一个商业级入口，让团队能更快验证场景，也能更稳地把能力交付给业务。'),
      bullets: [
        t('一个 API 入口对接主流模型与上游渠道'),
        t('降低新模型试点与切换时的工程成本'),
        t('让产品、研发与运营共享同一套接入方式'),
      ],
      visual: 'entry',
    },
    {
      eyebrow: t('Operational Confidence'),
      title: t('把试点能力升级成可以正式交付业务的稳定基础设施'),
      description: t('真正的商业化不是“能调用一次”，而是上线之后还能持续可用、可切换、可定位问题，并被团队长期维护。'),
      bullets: [
        t('统一查看入口、基础地址与调用路径'),
        t('让多渠道配置更容易切换、排查与回退'),
        t('更适合多人协作下的长期运维与交付'),
      ],
      visual: 'reliability',
    },
    {
      eyebrow: t('Governance That Scales'),
      title: t('当团队开始规模化使用 AI，权限、成本与路由就必须先被管起来'),
      description: t('不是所有增长都来自更多模型，很多增长来自更清晰的控制边界。让团队在一个后台里理解谁能用、怎么用、花在哪里。'),
      bullets: [
        t('集中管理渠道、令牌、权限与访问方式'),
        t('为团队协作建立更清晰的控制边界'),
        t('让运营、开发与管理视角落在同一个工作面板里'),
      ],
      visual: 'governance',
    },
  ];

  const ecosystemSummary = [
    {
      value: 'Provider Network',
      label: t('多模型统一接入'),
    },
    {
      value: 'Access Governance',
      label: t('权限与入口治理'),
    },
    {
      value: 'Usage Control',
      label: t('成本与配额控制'),
    },
  ];

  const scenarioCards = [
    {
      eyebrow: t('Product Teams'),
      title: t('多模型产品与功能试点'),
      description: t('当你需要快速验证新模型、新功能或新工作流时，不必为每个供应商分别接入一套协议。'),
    },
    {
      eyebrow: t('Internal AI'),
      title: t('企业内部 AI 助手与 Copilot'),
      description: t('把知识问答、内容生成、分析协作和内部工具统一放在一个可管理的接入层里。'),
    },
    {
      eyebrow: t('Customer Experience'),
      title: t('客服、销售与自动化触达'),
      description: t('让面向客户的对话、总结、转写与内容能力通过统一入口稳定输出。'),
    },
  ];

  const implementationSteps = [
    {
      step: '01',
      title: t('接入现有应用'),
      description: t('优先复用你现在的 SDK、调用方式与业务流程，不要求团队推倒重来。'),
    },
    {
      step: '02',
      title: t('配置模型与渠道'),
      description: t('把主流模型、上游渠道、令牌与路由策略集中配置在同一个后台。'),
    },
    {
      step: '03',
      title: t('上线并持续治理'),
      description: t('随着业务增长，再逐步补充权限、配额、成本控制和切换策略。'),
    },
  ];

  const bottomCtas = [
    {
      value: t('更快试点'),
      label: t('新模型接入不再需要重复开发一整套入口'),
    },
    {
      value: t('更稳交付'),
      label: t('把模型切换、路由调整与运维观察留在统一后台'),
    },
    {
      value: t('更清晰治理'),
      label: t('让权限、令牌、成本与调用方式在团队内有一致边界'),
    },
  ];

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) {
        content = sanitizeHtml(marked.parse(data));
      }
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);

      // 如果内容是 URL，则发送主题模式
      if (data.startsWith('https://')) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.onload = () => {
            iframe.contentWindow.postMessage({ themeMode: actualTheme }, '*');
            iframe.contentWindow.postMessage({ lang: i18n.language }, '*');
          };
        }
      }
    } else {
      showError(message);
      setHomePageContent('加载首页内容失败...');
    }
    setHomePageContentLoaded(true);
  };

  const handleCopyBaseURL = async () => {
    const ok = await copy(serverAddress);
    if (ok) {
      showSuccess(t('已复制到剪切板'));
    }
  };

  useEffect(() => {
    const checkNoticeAndShow = async () => {
      const lastCloseDate = localStorage.getItem('notice_close_date');
      const today = new Date().toDateString();
      if (lastCloseDate !== today) {
        try {
          const res = await API.get('/api/notice');
          const { success, data } = res.data;
          if (success && data && data.trim() !== '') {
            setNoticeVisible(true);
          }
        } catch (error) {
          console.error('获取公告失败:', error);
        }
      }
    };

    checkNoticeAndShow();
  }, []);

  useEffect(() => {
    displayHomePageContent().then();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setEndpointIndex((prev) => (prev + 1) % endpointItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [endpointItems.length]);

  return (
    <div className='classic-page-fill classic-home-page w-full overflow-x-hidden'>
      <NoticeModal
        visible={noticeVisible}
        onClose={() => setNoticeVisible(false)}
        isMobile={isMobile}
      />
      {!homePageContentLoaded ? (
        <div className='classic-home-default min-h-[70vh] items-center justify-center'>
          <div className='text-sm text-semi-color-text-2'>{t('加载中...')}</div>
        </div>
      ) : homePageContent === '' ? (
        <div
          className='classic-home-default w-full overflow-x-hidden'
          style={{
            background:
              'radial-gradient(circle at top, rgba(245, 158, 11, 0.12), transparent 24%), radial-gradient(circle at 20% 18%, rgba(251, 191, 36, 0.1), transparent 22%), linear-gradient(180deg, #fffaf5 0%, #fffdf9 40%, #ffffff 100%)',
          }}
        >
          <div className='relative overflow-hidden border-b border-[#d7b188]/18'>
            <div className='classic-home-grid-motion pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(120,74,38,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,74,38,0.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-45' />
            <div className='classic-home-glow pointer-events-none absolute left-[-120px] top-24 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl' />
            <div className='classic-home-glow classic-home-glow-delay-1 pointer-events-none absolute right-[-80px] top-12 h-80 w-80 rounded-full bg-orange-200/35 blur-3xl' />
            <div className='classic-home-glow classic-home-glow-delay-2 pointer-events-none absolute bottom-[-120px] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-100/35 blur-3xl' />

	            <div className='classic-home-rise relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 pt-20 pb-16 md:px-8 md:pt-24 md:pb-20 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10'>
	              <div className='classic-home-rise classic-home-rise-delay-1 max-w-2xl'>
	                <div className='classic-home-float-alt mb-6 inline-flex items-center gap-3 rounded-full border border-[#d7b188]/30 bg-white/70 px-4 py-2 text-xs tracking-[0.24em] text-[#8a6444] uppercase backdrop-blur-xl'>
	                  <span className='classic-home-glow inline-block h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_16px_rgba(252,211,77,0.9)]' />
	                  <span>{t('Built for growing teams')}</span>
	                </div>

	                <h1
	                  className={`classic-home-rise classic-home-rise-delay-2 max-w-3xl text-5xl font-semibold leading-[1.02] text-[#3f2618] md:text-6xl lg:text-7xl ${isChinese ? 'tracking-[-0.04em]' : 'tracking-[-0.05em]'}`}
	                >
	                  {t('把主流模型能力')}
	                  <br />
	                  <span className='bg-gradient-to-r from-[#5e341c] via-[#9d6233] to-[#d19c62] bg-clip-text text-transparent'>
	                    {t('接进同一个商业级入口')}
	                  </span>
	                </h1>

	                <p className='mt-6 max-w-2xl text-base leading-7 text-[#6f4a31] md:text-lg'>
	                  {t('为增长型业务打造的多模型接入层。让产品、运营与开发团队在一个统一入口里完成接入、切换、治理与扩张。')} {t('多模型统一接入，只需将基址替换为：')}
	                </p>

	                <div className='mt-8 flex flex-wrap items-center gap-3'>
	                  <Link to='/console'>
                    <Button
                      theme='solid'
	                      type='primary'
	                      size={isMobile ? 'default' : 'large'}
	                      className='classic-home-breathe !h-11 !rounded-full !border-none !bg-[#f4d7b0] !px-6 !text-sm !font-semibold !text-[#3b2417] hover:!bg-[#edd0a5]'
	                      icon={<IconPlay />}
	                    >
	                      {t('立即开始')}
	                    </Button>
	                  </Link>

	                  <Button
	                    size={isMobile ? 'default' : 'large'}
	                    className='!h-11 !rounded-full !border !border-[#d7b188]/25 !bg-white/80 !px-6 !text-sm !font-medium !text-[#5a361f] backdrop-blur-md hover:!bg-[#fff8ef]'
	                    icon={<IconFile />}
	                    onClick={() => window.open(docsUrl, '_blank')}
	                  >
	                    {t('查看文档')}
	                  </Button>

	                  <Link to='/pricing'>
	                    <Button
	                      size={isMobile ? 'default' : 'large'}
	                      className='!h-11 !rounded-full !border !border-[#d7b188]/25 !bg-transparent !px-6 !text-sm !font-medium !text-[#7a5337] hover:!bg-[#fff5e8] hover:!text-[#4b2b17]'
	                    >
	                      {t('探索模型')}
	                    </Button>
	                  </Link>
	                </div>

	                <div className='mt-6 flex flex-wrap items-center gap-3'>
	                  {heroSignals.map((item, index) => (
	                    <div
	                      key={item.value}
	                      className='classic-home-float rounded-full border border-[#d7b188]/24 bg-white/72 px-4 py-2 shadow-[0_10px_30px_rgba(182,133,82,0.08)]'
                        style={getFloatStyle(index, 0.4, 8)}
	                    >
	                      <div className='text-[11px] font-medium tracking-[0.18em] text-[#4a2a16] uppercase'>
	                        {item.value}
	                      </div>
	                      <div className='mt-1 text-[11px] text-[#8f6848]'>
	                        {item.label}
	                      </div>
	                    </div>
	                  ))}
	                </div>

	                <div className='mt-8 flex flex-wrap gap-2'>
	                  {HERO_PROVIDER_LABELS.map((item) => (
	                    <div
	                      key={item}
	                      className='rounded-full border border-[#d7b188]/24 bg-white/70 px-3 py-1.5 text-xs text-[#8b6442] backdrop-blur-xl'
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className='mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
                  {quickHighlights.map((item, index) => (
                    <div
                      key={item.label}
	                      className='classic-home-rise rounded-3xl border border-[#e2c29e]/35 bg-white/86 px-4 py-4 backdrop-blur-xl shadow-[0_18px_40px_rgba(188,145,96,0.08)]'
                        style={getRiseStyle(index, 0.22)}
	                    >
	                      <div className='text-2xl font-semibold tracking-[-0.04em] text-[#3f2618]'>
	                        {item.value}
	                      </div>
	                      <div className='mt-1 text-xs leading-5 text-[#7f5a3d]'>
	                        {item.label}
	                      </div>
	                      <div className='mt-2 text-xs leading-5 text-[#9a7455]'>
	                        {item.detail}
	                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='classic-home-rise classic-home-rise-delay-3 relative'>
	                <div className='classic-home-float classic-home-sheen overflow-hidden rounded-[32px] border border-[#e4c8a8]/55 bg-white/90 shadow-[0_32px_120px_rgba(190,145,92,0.14)] backdrop-blur-2xl'>
	                  <div className='flex items-center justify-between border-b border-[#e4c8a8]/55 px-5 py-4'>
                    <div className='flex items-center gap-2'>
                      <span className='h-2.5 w-2.5 rounded-full bg-[#ff5f57]' />
                      <span className='h-2.5 w-2.5 rounded-full bg-[#febc2e]' />
                      <span className='h-2.5 w-2.5 rounded-full bg-[#28c840]' />
                    </div>
	                    <div className='rounded-full border border-[#d7b188]/25 bg-[#fff7ef] px-3 py-1 text-[11px] tracking-[0.2em] text-[#8e6644] uppercase'>
	                      {versionTag}
	                    </div>
	                  </div>

	                  <div className='space-y-6 px-5 py-5 md:px-6 md:py-6'>
	                    <div className='rounded-2xl border border-[#e4c8a8]/55 bg-[#fffaf4] p-4'>
	                      <div className='mb-3 flex items-center justify-between gap-4'>
	                        <div>
	                          <div className='text-[11px] tracking-[0.2em] text-[#9a7455] uppercase'>
	                            {t('基础地址')}
	                          </div>
	                          <div className='mt-1 break-all text-sm text-[#3f2618]'>
	                            {serverAddress}
	                          </div>
	                        </div>
                        <Button
                          theme='borderless'
                          icon={<IconCopy />}
                          onClick={handleCopyBaseURL}
	                          className='!rounded-full !bg-[#fff1df] !text-[#8d6544] hover:!bg-[#fde7ca] hover:!text-[#5a341d]'
	                        />
	                      </div>

	                      <div className='rounded-2xl border border-[#e4c8a8]/55 bg-white px-4 py-3'>
	                        <div className='mb-2 text-[11px] tracking-[0.2em] text-[#9a7455] uppercase'>
	                          {t('推荐起步')}
	                        </div>
                        <ScrollList
                          bodyHeight={28}
                          style={{ border: 'unset', boxShadow: 'unset' }}
                        >
                          <ScrollItem
                            mode='wheel'
                            cycled={true}
                            list={endpointItems}
                            selectedIndex={endpointIndex}
                            onSelect={({ index }) => setEndpointIndex(index)}
                          />
                        </ScrollList>
                      </div>
                    </div>

	                    <div className='rounded-2xl border border-[#e4c8a8]/55 bg-[#fffaf4] p-4'>
	                      <div className='mb-3 text-[11px] tracking-[0.2em] text-[#9a7455] uppercase'>
	                        {t('请求示例')}
	                      </div>
	                      <pre className='overflow-x-auto rounded-2xl bg-[#2a1a12] p-4 text-xs leading-6 text-[#fff4e7]'>
                        <code>{`POST ${serverAddress}${selectedEndpoint}
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "model": "gpt-4.1-mini",
  "messages": [
    { "role": "user", "content": "Hello from Vaultec" }
  ]
}`}</code>
                      </pre>
                    </div>

                    <div className='grid gap-3 sm:grid-cols-2'>
	                      <div className='rounded-2xl border border-[#e4c8a8]/55 bg-white p-4'>
	                        <div className='text-[11px] tracking-[0.2em] text-[#9a7455] uppercase'>
	                          {t('默认接入方式')}
	                        </div>
	                        <div className='mt-2 text-base font-medium text-[#3f2618]'>
	                          OpenAI Compatible
	                        </div>
	                        <div className='mt-1 text-sm leading-6 text-[#7a5337]'>
	                          {t('以统一协议连接文本、图像、音频与任务型接口。')}
	                        </div>
	                      </div>
	                      <div className='rounded-2xl border border-[#e4c8a8]/55 bg-white p-4'>
	                        <div className='text-[11px] tracking-[0.2em] text-[#9a7455] uppercase'>
	                          {t('管理入口')}
	                        </div>
	                        <div className='mt-2 text-base font-medium text-[#3f2618]'>
	                          /console
	                        </div>
	                        <div className='mt-1 text-sm leading-6 text-[#7a5337]'>
	                          {t('把渠道、令牌与配额放在同一个控制台里。')}
	                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mx-auto w-full max-w-6xl px-6 pt-8 pb-8 md:px-8 md:pt-10 md:pb-12'>
            <div className='classic-home-rise rounded-[28px] border border-[#e4c8a8]/40 bg-white/88 px-5 py-5 backdrop-blur-xl shadow-[0_24px_50px_rgba(188,145,96,0.08)] md:px-7'>
	              <div className='grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center'>
	                <div>
	                  <div className='text-[11px] tracking-[0.24em] text-[#a27750] uppercase'>
	                    {t('Commercial Readiness')}
	                  </div>
	                  <h2 className='mt-3 max-w-lg text-2xl font-semibold leading-[1.15] tracking-[-0.04em] text-[#3f2618]'>
	                    {t('从试点到正式部署，用同一套接入层推进业务落地')}
	                  </h2>
	                  <p className='mt-3 max-w-xl text-sm leading-7 text-[#7a5337] md:text-base'>
	                    {t('更像品牌落地页，也更像真实业务需要的 AI 基础设施。你可以先试点、再接更多模型、再把权限和成本管起来，而不需要重做整套入口。')}
	                  </p>
	                </div>
	                <div className='grid gap-3 sm:grid-cols-2'>
	                  {trustSignals.map((item) => (
	                    <div
	                      key={item}
	                      className='rounded-3xl border border-[#e4c8a8]/40 bg-[#fffaf4] px-4 py-4 text-sm text-[#7b5438]'
	                    >
	                      {item}
	                    </div>
	                  ))}
	                  <div className='rounded-3xl border border-[#e4c8a8]/40 bg-[#fff6ec] px-4 py-4 text-sm leading-6 text-[#6f4a31] sm:col-span-2'>
	                    {t('为多模型产品、企业内部工具与面向客户的 AI 场景提供同一个商业级接入底座。')}
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>

          <div className='mx-auto w-full max-w-6xl px-6 py-6 md:px-8 md:py-8'>
            <div className='grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start'>
              <div>
                <div className='text-[11px] tracking-[0.24em] text-[#a27750] uppercase'>
                  {t('Where It Fits')}
                </div>
                <h2 className='mt-3 max-w-lg text-2xl font-semibold leading-[1.15] tracking-[-0.04em] text-[#3f2618] md:text-3xl'>
                  {t('不是给“调用一次模型”准备的，而是给真实业务持续使用准备的')}
                </h2>
                <p className='mt-4 max-w-xl text-sm leading-7 text-[#765036] md:text-base'>
                  {t('当业务开始从试点走向正式交付，首页需要的不只是模型名字，而是一个能支撑接入、切换、治理和扩张的统一入口。')}
                </p>
              </div>
              <div className='grid gap-4 md:grid-cols-3'>
                {scenarioCards.map((item, index) => (
                  <div
                    key={item.title}
                    className='classic-home-rise rounded-[28px] border border-[#e4c8a8]/40 bg-white/88 p-5 shadow-[0_20px_48px_rgba(188,145,96,0.08)] backdrop-blur-xl'
                    style={getRiseStyle(index, 0.18)}
                  >
                    <div className='text-[11px] tracking-[0.2em] text-[#a27750] uppercase'>
                      {item.eyebrow}
                    </div>
                    <div className='mt-3 text-lg font-semibold leading-7 text-[#3f2618]'>
                      {item.title}
                    </div>
                    <div className='mt-3 text-sm leading-6 text-[#765036]'>
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='mx-auto w-full max-w-6xl px-6 py-8 md:px-8 md:py-10'>
            <div className='grid gap-8'>
              {featureStories.map((story, index) => (
                <div
                  key={story.title}
	                  className='classic-home-rise grid items-center gap-8 rounded-[32px] border border-[#e4c8a8]/40 bg-white/88 p-6 backdrop-blur-xl shadow-[0_24px_50px_rgba(188,145,96,0.08)] lg:grid-cols-2 lg:p-8'
                    style={getRiseStyle(index, 0.12)}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
	                    <div className='text-[11px] tracking-[0.24em] text-[#a27750] uppercase'>
	                      {story.eyebrow}
	                    </div>
	                    <h2 className='mt-3 max-w-2xl text-2xl font-semibold leading-[1.15] tracking-[-0.04em] text-[#3f2618] md:text-3xl'>
	                      {story.title}
	                    </h2>
	                    <p className='mt-4 max-w-xl text-sm leading-7 text-[#765036] md:text-base'>
	                      {story.description}
	                    </p>
                    <div className='mt-6 grid gap-3'>
                      {story.bullets.map((bullet) => (
                        <div
                          key={bullet}
	                          className='flex items-start gap-3 rounded-2xl border border-[#e4c8a8]/40 bg-[#fffaf4] px-4 py-3'
	                        >
	                          <span className='mt-1 inline-block h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(252,211,77,0.85)]' />
	                          <span className='text-sm leading-6 text-[#6f4a31]'>
	                            {bullet}
	                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    {story.visual === 'entry' ? (
	                      <div className='rounded-[28px] border border-[#e4c8a8]/40 bg-[#fffaf4] p-5 shadow-[0_24px_80px_rgba(188,145,96,0.12)]'>
	                        <div className='mb-4 text-[11px] tracking-[0.2em] text-[#a27750] uppercase'>
                          Unified Entry
                        </div>
                        <div className='grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center'>
                          <div className='grid gap-3'>
	                            <div className='rounded-2xl border border-[#e4c8a8]/40 bg-white px-4 py-3 text-sm text-[#6e4a31]'>
                              OpenAI SDK
                            </div>
	                            <div className='rounded-2xl border border-[#e4c8a8]/40 bg-white px-4 py-3 text-sm text-[#6e4a31]'>
                              Internal Apps
                            </div>
	                            <div className='rounded-2xl border border-[#e4c8a8]/40 bg-white px-4 py-3 text-sm text-[#6e4a31]'>
                              Workflow Bots
                            </div>
                          </div>
	                          <div className='hidden text-center text-[#c0956c]/55 md:block'>→</div>
	                          <div className='rounded-[26px] border border-[#d7b188]/30 bg-[#fff3e2] p-5 text-center shadow-[0_0_0_1px_rgba(252,211,77,0.08)]'>
	                            <div className='text-[11px] tracking-[0.24em] text-[#9d734f] uppercase'>
	                              Vaultec
	                            </div>
	                            <div className='mt-2 text-lg font-semibold text-[#4a2a16]'>
	                              One Unified Entry
	                            </div>
	                            <div className='mt-4 grid grid-cols-2 gap-2 text-xs text-[#7a5337]'>
                              {HERO_PROVIDER_LABELS.map((item) => (
                                <div
                                  key={item}
	                                  className='rounded-full border border-[#d7b188]/25 bg-white/80 px-2 py-1'
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {story.visual === 'reliability' ? (
	                      <div className='rounded-[28px] border border-[#e4c8a8]/40 bg-[#fffaf4] p-5 shadow-[0_24px_80px_rgba(188,145,96,0.12)]'>
	                        <div className='mb-4 text-[11px] tracking-[0.2em] text-[#a27750] uppercase'>
                          Reliability Layer
                        </div>
                        <div className='grid gap-3'>
	                          <div className='rounded-2xl border border-[#e4c8a8]/40 bg-[#fff3e5] px-4 py-4'>
	                            <div className='text-xs tracking-[0.22em] text-[#9d734f] uppercase'>
                              Monitor
                            </div>
	                            <div className='mt-2 text-base font-medium text-[#4a2a16]'>
                              统一观察入口与状态
                            </div>
                          </div>
                          <div className='grid gap-3 md:grid-cols-2'>
	                            <div className='rounded-2xl border border-[#e4c8a8]/40 bg-white px-4 py-4'>
	                              <div className='text-xs tracking-[0.22em] text-[#a27750] uppercase'>
                                Primary Route
                              </div>
	                              <div className='mt-2 text-base font-medium text-[#4a2a16]'>
                                渠道 A / 默认链路
                              </div>
                            </div>
	                            <div className='rounded-2xl border border-[#e4c8a8]/40 bg-white px-4 py-4'>
	                              <div className='text-xs tracking-[0.22em] text-[#a27750] uppercase'>
                                Secondary Route
                              </div>
	                              <div className='mt-2 text-base font-medium text-[#4a2a16]'>
                                渠道 B / 切换路径
                              </div>
                            </div>
                          </div>
	                          <div className='rounded-2xl border border-[#e4c8a8]/40 bg-[#fff7ef] px-4 py-4 text-sm leading-7 text-[#6f4a31]'>
                            让团队在一个控制台里理解“入口在哪里、模型走哪条链路、切换后会影响什么”。
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {story.visual === 'governance' ? (
	                      <div className='rounded-[28px] border border-[#e4c8a8]/40 bg-[#fffaf4] p-5 shadow-[0_24px_80px_rgba(188,145,96,0.12)]'>
	                        <div className='mb-4 text-[11px] tracking-[0.2em] text-[#a27750] uppercase'>
                          Governance Stack
                        </div>
                        <div className='grid gap-3'>
                          {ecosystemSummary.map((item) => (
                            <div
                              key={item.value}
	                              className='flex items-center justify-between rounded-2xl border border-[#e4c8a8]/40 bg-white px-4 py-4'
                            >
                              <div>
	                                <div className='text-[11px] tracking-[0.22em] text-[#a27750] uppercase'>
                                  {item.value}
                                </div>
	                                <div className='mt-1 text-sm text-[#735036]'>
                                  {item.label}
                                </div>
                              </div>
	                              <div className='rounded-full border border-[#d7b188]/25 bg-[#fff3e2] px-3 py-1 text-xs text-[#8e6644]'>
                                Active
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='mx-auto w-full max-w-6xl px-6 py-6 md:px-8 md:py-8'>
            <div className='rounded-[32px] border border-[#e4c8a8]/40 bg-white/90 p-6 shadow-[0_24px_50px_rgba(188,145,96,0.08)] backdrop-blur-xl md:p-8'>
              <div className='max-w-2xl'>
                <div className='text-[11px] tracking-[0.24em] text-[#a27750] uppercase'>
                  {t('Implementation Path')}
                </div>
                <h2 className='mt-3 text-2xl font-semibold leading-[1.15] tracking-[-0.04em] text-[#3f2618] md:text-3xl'>
                  {t('从现有系统平滑接入，而不是为了上 AI 重写你的业务接口')}
                </h2>
                <p className='mt-4 text-sm leading-7 text-[#765036] md:text-base'>
                  {t('更适合真实团队的方式，通常不是一次性大改，而是在保留现有节奏的同时，把 AI 接入层逐步替换成更可管理的基础设施。')}
                </p>
              </div>

              <div className='mt-8 grid gap-4 md:grid-cols-3'>
                {implementationSteps.map((item, index) => (
                  <div
                    key={item.step}
                    className='classic-home-rise rounded-[28px] border border-[#e4c8a8]/40 bg-[#fffaf4] p-5'
                    style={getRiseStyle(index, 0.2)}
                  >
                    <div className='text-sm font-semibold tracking-[0.18em] text-[#b58457]'>
                      {item.step}
                    </div>
                    <div className='mt-4 text-lg font-semibold text-[#3f2618]'>
                      {item.title}
                    </div>
                    <div className='mt-3 text-sm leading-6 text-[#765036]'>
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='mx-auto w-full max-w-6xl px-6 pt-4 pb-20 md:px-8 md:pb-24'>
            <div className='mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
              <div>
	                <div className='text-xs tracking-[0.24em] text-[#a27750] uppercase'>
	                  {t('支持众多的大模型供应商')}
	                </div>
	                <h2 className='mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#3f2618] md:text-3xl'>
	                  {t('保持前沿能力，也保持商业落地速度')}
	                </h2>
	              </div>
	              <div className='max-w-lg text-sm leading-6 text-[#765036]'>
	                {t('把模型选择留给业务，把接入复杂度留给基础设施。')}
	              </div>
	            </div>

            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
              {PROVIDER_ICONS.map((ProviderIcon, index) => (
                <div
                  key={`provider-${index}`}
	                  className='classic-home-rise flex h-20 items-center justify-center rounded-3xl border border-[#e4c8a8]/40 bg-white/90 text-[#5d3822] backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#d7b188]/45 hover:bg-[#fffaf3]'
                    style={getRiseStyle(index, 0.12)}
                >
                  <div className='classic-home-float' style={getFloatStyle(index, 0.8, 10)}>
                    <ProviderIcon size={34} />
                  </div>
                </div>
              ))}
            </div>

            <div className='classic-home-rise classic-home-sheen mt-10 rounded-[32px] border border-[#e4c8a8]/40 bg-white/92 p-6 shadow-[0_24px_50px_rgba(188,145,96,0.08)] backdrop-blur-xl md:p-8'>
              <div className='grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center'>
                <div>
                  <div className='text-[11px] tracking-[0.24em] text-[#a27750] uppercase'>
                    {t('Ready To Build')}
                  </div>
                  <h2 className='mt-3 max-w-2xl text-2xl font-semibold leading-[1.15] tracking-[-0.04em] text-[#3f2618] md:text-3xl'>
                    {t('让团队用一个入口管理主流模型，而不是维护越来越多的接入分叉')}
                  </h2>
                  <div className='mt-5 grid gap-3 md:grid-cols-3'>
                    {bottomCtas.map((item) => (
                      <div
                        key={item.value}
                        className='rounded-2xl border border-[#e4c8a8]/40 bg-[#fffaf4] px-4 py-4'
                      >
                        <div className='text-base font-semibold text-[#4a2a16]'>
                          {item.value}
                        </div>
                        <div className='mt-2 text-sm leading-6 text-[#765036]'>
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='flex flex-wrap items-center gap-3 lg:justify-end'>
                  <Link to='/console'>
                    <Button
                      theme='solid'
                      type='primary'
                      size={isMobile ? 'default' : 'large'}
                      className='!h-11 !rounded-full !border-none !bg-[#f4d7b0] !px-6 !text-sm !font-semibold !text-[#3b2417] hover:!bg-[#edd0a5]'
                    >
                      {t('进入管理后台')}
                    </Button>
                  </Link>
                  <Button
                    size={isMobile ? 'default' : 'large'}
                    className='!h-11 !rounded-full !border !border-[#d7b188]/25 !bg-white/90 !px-6 !text-sm !font-medium !text-[#5a361f] hover:!bg-[#fff8ef]'
                    onClick={() => window.open(docsUrl, '_blank')}
                  >
                    {t('查看接入文档')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='classic-page-fill overflow-x-hidden w-full'>
          {homePageContent.startsWith('https://') ? (
            <iframe
              src={homePageContent}
              className='w-full h-screen border-none'
            />
          ) : (
            <div
              className='mt-[60px]'
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(homePageContent) }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
