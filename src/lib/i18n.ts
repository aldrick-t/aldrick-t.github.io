import type { ItemType } from './items';

export const languages = ['en', 'es', 'ja'] as const;
export const localizedLanguages = ['es', 'ja'] as const;
export const defaultLanguage = 'en';

export type Language = (typeof languages)[number];
export type LocalizedLanguage = (typeof localizedLanguages)[number];

export const languageMeta: Record<Language, { label: string; nativeLabel: string; htmlLang: string; locale: string }> = {
  en: { label: 'English', nativeLabel: 'English', htmlLang: 'en', locale: 'en' },
  es: { label: 'Spanish', nativeLabel: 'Español', htmlLang: 'es', locale: 'es-MX' },
  ja: { label: 'Japanese', nativeLabel: '日本語 (BETA)', htmlLang: 'ja', locale: 'ja-JP' }
};

export function isLanguage(value: string | undefined): value is Language {
  return Boolean(value && (languages as readonly string[]).includes(value));
}

export function getLanguageFromPath(pathname: string): Language {
  const [, firstSegment] = pathname.split('/');
  return isLanguage(firstSegment) ? firstSegment : defaultLanguage;
}

export function getPathWithoutLanguage(pathname: string): string {
  const path = pathname || '/';
  const [, firstSegment, ...rest] = path.split('/');
  if (!isLanguage(firstSegment)) return path;
  const unprefixed = `/${rest.join('/')}`;
  return unprefixed === '/' ? '/' : unprefixed.replace(/\/$/, '') || '/';
}

export function localizePath(path: string, language: Language): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const unprefixed = getPathWithoutLanguage(normalized);
  if (language === defaultLanguage) return unprefixed;
  return unprefixed === '/' ? `/${language}/` : `/${language}${unprefixed}`;
}

export function itemPath(slug: string, language: Language): string {
  return localizePath(`/items/${slug}`, language);
}

export function formatDate(value: string, language: Language): string {
  if (value === 'Present') return ui[language].date.present;
  const [year, month] = value.split('-');
  if (!month) return year;
  return new Intl.DateTimeFormat(languageMeta[language].locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(Number(year), Number(month) - 1, 1))
  );
}

export function formatDateRange(start: string, end: string, language: Language): string {
  return `${formatDate(start, language)} — ${formatDate(end, language)}`;
}

type ItemTypeCopy = Record<ItemType, { plural: string; singular: string }>;

const itemTypes: Record<Language, ItemTypeCopy> = {
  en: {
    project: { plural: 'Projects', singular: 'Project' },
    work: { plural: 'Work', singular: 'Work' },
    education: { plural: 'Education', singular: 'Education' },
    publication: { plural: 'Publications', singular: 'Publication' },
    conference: { plural: 'Conferences', singular: 'Conference' },
    award: { plural: 'Awards', singular: 'Award' },
    course: { plural: 'Courses', singular: 'Course' },
    certification: { plural: 'Certifications', singular: 'Certification' },
    volunteering: { plural: 'Volunteering', singular: 'Volunteering' },
    news: { plural: 'News', singular: 'News' }
  },
  es: {
    project: { plural: 'Proyectos', singular: 'Proyecto' },
    work: { plural: 'Experiencia', singular: 'Experiencia' },
    education: { plural: 'Educación', singular: 'Educación' },
    publication: { plural: 'Publicaciones', singular: 'Publicación' },
    conference: { plural: 'Conferencias', singular: 'Conferencia' },
    award: { plural: 'Reconocimientos', singular: 'Reconocimiento' },
    course: { plural: 'Cursos', singular: 'Curso' },
    certification: { plural: 'Certificaciones', singular: 'Certificación' },
    volunteering: { plural: 'Voluntariado', singular: 'Voluntariado' },
    news: { plural: 'Noticias', singular: 'Noticia' }
  },
  ja: {
    project: { plural: 'プロジェクト', singular: 'プロジェクト' },
    work: { plural: '職務経験', singular: '職務経験' },
    education: { plural: '学歴', singular: '学歴' },
    publication: { plural: '出版物', singular: '出版物' },
    conference: { plural: 'カンファレンス', singular: 'カンファレンス' },
    award: { plural: '受賞', singular: '受賞' },
    course: { plural: 'コース', singular: 'コース' },
    certification: { plural: '認定資格', singular: '認定資格' },
    volunteering: { plural: 'ボランティア', singular: 'ボランティア' },
    news: { plural: 'ニュース', singular: 'ニュース' }
  }
};

export function getItemTypeLabel(type: ItemType, language: Language, form: 'plural' | 'singular' = 'plural'): string {
  return itemTypes[language][type][form];
}

export function getItemTypeLabels(language: Language): Record<ItemType, string> {
  return Object.fromEntries(Object.entries(itemTypes[language]).map(([type, labels]) => [type, labels.plural])) as Record<ItemType, string>;
}

export const skillGroupsByLanguage: Record<Language, Record<string, string>> = {
  en: {
    Programming: 'Programming',
    'Robotics & autonomy': 'Robotics & autonomy',
    'AI & perception': 'AI & perception',
    'Embedded & hardware': 'Embedded & hardware',
    'Software & tools': 'Software & tools',
    'CAD / CAE / simulation': 'CAD / CAE / simulation',
    'Libraries & frameworks': 'Libraries & frameworks'
  },
  es: {
    Programming: 'Programación',
    'Robotics & autonomy': 'Robótica y autonomía',
    'AI & perception': 'IA y percepción',
    'Embedded & hardware': 'Embebidos y hardware',
    'Software & tools': 'Software y herramientas',
    'CAD / CAE / simulation': 'CAD / CAE / simulación',
    'Libraries & frameworks': 'Bibliotecas y frameworks'
  },
  ja: {
    Programming: 'プログラミング',
    'Robotics & autonomy': 'ロボティクスと自律性',
    'AI & perception': 'AIと認識',
    'Embedded & hardware': '組込みとハードウェア',
    'Software & tools': 'ソフトウェアとツール',
    'CAD / CAE / simulation': 'CAD / CAE / シミュレーション',
    'Libraries & frameworks': 'ライブラリとフレームワーク'
  }
};

export const skillLabelsByLanguage: Record<Language, Record<string, string>> = {
  en: {},
  es: {
    'sensor-integration': 'Integración de sensores',
    'robot-control': 'Control robótico',
    'computer-vision': 'Visión por computadora',
    'machine-learning': 'Aprendizaje automático',
    'deep-learning': 'Aprendizaje profundo',
    'object-detection': 'Detección de objetos',
    'pose-estimation': 'Estimación de pose',
    embedded: 'Sistemas embebidos',
    'circuit-design': 'Diseño de circuitos',
    linux: 'Linux',
    docker: 'Docker / Podman',
    postgresql: 'PostgreSQL',
    grafana: 'Grafana',
    git: 'Git / GitHub',
    fea: 'Análisis por elementos finitos'
  },
  ja: {
    'sensor-integration': 'センサー統合',
    'robot-control': 'ロボット制御',
    'computer-vision': 'コンピュータビジョン',
    'machine-learning': '機械学習',
    'deep-learning': '深層学習',
    'object-detection': '物体検出',
    'pose-estimation': '姿勢推定',
    embedded: '組込みシステム',
    'circuit-design': '回路設計',
    linux: 'Linux',
    docker: 'Docker / Podman',
    postgresql: 'PostgreSQL',
    grafana: 'Grafana',
    git: 'Git / GitHub',
    fea: '有限要素解析'
  }
};

export const ui = {
  en: {
    site: {
      title: 'Robotics and Digital Systems Engineer',
      description: 'Robotics and digital systems engineer working across autonomous systems, perception, embedded software, and engineering tooling.',
      introduction:
        'Building dependable robotic and software systems, from perception and autonomy to telemetry, data and engineering tools. My work focuses on systems that transfer cleanly from prototypes and simulation into real operating environments.',
      availability: 'Open to robotics, software, research, and graduate study opportunities.',
      researchInterests: [
        'Sim-to-real robotics and digital twins',
        'Autonomous robotics',
        'Simulation and modeling of robotic systems',
        'SLAM, perception, and sensor fusion',
        'Embodied AI and field robotics',
        'Soft robotics and compliant mechanisms'
      ],
      languages: [
        { language: 'English', proficiency: 'Native proficiency', detail: 'IELTS 8.5 · C2' },
        { language: 'Spanish', proficiency: 'Native proficiency' },
        { language: 'Japanese', proficiency: 'Elementary proficiency' }
      ]
    },
    nav: { aria: 'Primary navigation', home: 'Home', portfolio: 'Portfolio', cv: 'CV', contact: 'Contact' },
    language: { label: 'Language', select: 'Select language' },
    footer: { aria: 'Footer links', email: 'Email' },
    skipLink: 'Skip to content',
    date: { present: 'Present' },
    common: {
      portfolio: 'Portfolio',
      cv: 'CV',
      contactLinks: 'Contact links',
      open: 'Open',
      allItems: 'All items',
      readItem: 'Read item',
      verify: 'Verify',
      copy: 'Copy',
      copied: 'Copied',
      selectAndCopy: 'Select and copy',
      downloadPdf: 'Download PDF',
      externalSuffix: '↗'
    },
    home: {
      onThisPage: 'On this page',
      sections: {
        intro: 'Intro',
        featured: 'Featured',
        timeline: 'Timeline',
        skills: 'Skills',
        languages: 'Languages',
        credentials: 'Courses & certifications'
      },
      researchInterests: 'Research Interests',
      timelineIntro: 'Time runs from newest to oldest. Parallel lanes show work that happened concurrently.'
    },
    timeline: { concurrentWith: 'Concurrent with', more: 'more' },
    portfolioPage: {
      title: 'Portfolio',
      description: 'All projects, experience, education, recognition, service, and continued learning.',
      intro: 'Complete index of projects, experience, education, recognition, service and more.',
      sectionsAria: 'Portfolio sections',
      controlsAria: 'Portfolio display controls',
      viewMode: 'View mode',
      timelineView: 'Timeline',
      galleryView: 'Gallery',
      filterByType: 'Filter by type',
      allTypes: 'All',
      sortBy: 'Sort by',
      latestSort: 'Latest',
      relevanceSort: 'Relevance',
      noThumbnail: 'No thumbnail',
      openItem: 'Open item'
    },
    itemPage: {
      breadcrumbAria: 'Breadcrumb',
      highlights: 'Highlights',
      details: 'Details',
      media: 'Media',
      skills: 'Skills',
      related: 'Related items',
      adjacentAria: 'Adjacent portfolio items',
      previous: 'Previous',
      next: 'Next'
    },
    cvPage: {
      title: 'Curriculum Vitae',
      description: "Preview and download Aldrick Tadeo's hand-authored Typst CV.",
      intro: 'Multiple scopes available, a full length CV, a engineering focused one-page resume and an academic focused one-page resume.',
      previewAria: 'Curriculum Vitae Preview',
      variantsAria: 'CV variants',
      previewing: 'Previewing',
      fallback: 'Your browser cannot display the PDF inline.',
      fallbackDownload: 'Download the selected CV',
      variants: { engineering: 'Engineering', academic: 'Academic', full: 'Full Length' }
    },
    contactPage: {
      title: 'Contact',
      description: 'Professional contact links for Aldrick Tadeo.',
      eyebrow: 'Direct channels',
      intro: 'Email is the best way to reach me. Professional profiles are linked below.'
    },
    notFound: {
      description: 'The requested page could not be found.',
      eyebrow: 'Error 404',
      title: 'Page not found',
      intro: 'The address may be outdated or the page may have moved.'
    }
  },
  es: {
    site: {
      title: 'Ingeniero en Robótica y Sistemas Digitales',
      description: 'Ingeniero en robótica y sistemas digitales con trabajo en sistemas autónomos, percepción, software embebido y herramientas de ingeniería.',
      introduction:
        'Construyo sistemas robóticos y de software confiables, desde percepción y autonomía hasta telemetría, datos y herramientas de ingeniería. Mi trabajo se enfoca en sistemas que pasan con claridad de prototipos y simulación a entornos reales de operación.',
      availability: 'Abierto a oportunidades en robótica, software, investigación y estudios de posgrado.',
      researchInterests: [
        'Robótica sim-to-real y gemelos digitales',
        'Robótica autónoma',
        'Simulación y modelado de sistemas robóticos',
        'SLAM, percepción y fusión de sensores',
        'IA embebida en robótica de campo',
        'Robótica blanda y mecanismos complacientes'
      ],
      languages: [
        { language: 'Inglés', proficiency: 'Competencia nativa', detail: 'IELTS 8.5 · C2' },
        { language: 'Español', proficiency: 'Competencia nativa' },
        { language: 'Japonés', proficiency: 'Competencia elemental' }
      ]
    },
    nav: { aria: 'Navegación principal', home: 'Inicio', portfolio: 'Portafolio', cv: 'CV', contact: 'Contacto' },
    language: { label: 'Idioma', select: 'Seleccionar idioma' },
    footer: { aria: 'Enlaces del pie de página', email: 'Correo' },
    skipLink: 'Saltar al contenido',
    date: { present: 'Presente' },
    common: {
      portfolio: 'Portafolio',
      cv: 'CV',
      contactLinks: 'Enlaces de contacto',
      open: 'Abrir',
      allItems: 'Todos los elementos',
      readItem: 'Leer elemento',
      verify: 'Verificar',
      copy: 'Copiar',
      copied: 'Copiado',
      selectAndCopy: 'Selecciona y copia',
      downloadPdf: 'Descargar PDF',
      externalSuffix: '↗'
    },
    home: {
      onThisPage: 'En esta página',
      sections: {
        intro: 'Intro',
        featured: 'Destacado',
        timeline: 'Línea de tiempo',
        skills: 'Habilidades',
        languages: 'Idiomas',
        credentials: 'Cursos y certificaciones'
      },
      researchInterests: 'Intereses de investigación',
      timelineIntro: 'El tiempo va de lo más reciente a lo más antiguo. Los carriles paralelos muestran trabajos que ocurrieron al mismo tiempo.'
    },
    timeline: { concurrentWith: 'Concurrente con', more: 'más' },
    portfolioPage: {
      title: 'Portafolio',
      description: 'Proyectos, experiencia, educación, reconocimientos, servicio y aprendizaje continuo.',
      intro: 'Índice completo de proyectos, experiencia, educación, reconocimientos, servicio y más.',
      sectionsAria: 'Secciones del portafolio',
      controlsAria: 'Controles de visualización del portafolio',
      viewMode: 'Modo de vista',
      timelineView: 'Línea de tiempo',
      galleryView: 'Galería',
      filterByType: 'Filtrar por tipo',
      allTypes: 'Todo',
      sortBy: 'Ordenar por',
      latestSort: 'Más reciente',
      relevanceSort: 'Relevancia',
      noThumbnail: 'Sin miniatura',
      openItem: 'Abrir elemento'
    },
    itemPage: {
      breadcrumbAria: 'Ruta de navegación',
      highlights: 'Aspectos destacados',
      details: 'Detalles',
      media: 'Media',
      skills: 'Habilidades',
      related: 'Elementos relacionados',
      adjacentAria: 'Elementos adyacentes del portafolio',
      previous: 'Anterior',
      next: 'Siguiente'
    },
    cvPage: {
      title: 'Currículum Vitae',
      description: 'Vista previa y descarga del CV escrito a mano en Typst de Aldrick Tadeo.',
      intro: 'Hay varios alcances disponibles: un CV completo, un currículum de una página enfocado en ingeniería y un currículum de una página enfocado en academia.',
      previewAria: 'Vista previa del currículum vitae',
      variantsAria: 'Variantes de CV',
      previewing: 'Vista previa de',
      fallback: 'Tu navegador no puede mostrar el PDF en línea.',
      fallbackDownload: 'Descargar el CV seleccionado',
      variants: { engineering: 'Ingeniería', academic: 'Académico', full: 'Completo' }
    },
    contactPage: {
      title: 'Contacto',
      description: 'Enlaces de contacto profesional de Aldrick Tadeo.',
      eyebrow: 'Canales directos',
      intro: 'El correo electrónico es la mejor forma de contactarme. Los perfiles profesionales están enlazados abajo.'
    },
    notFound: {
      description: 'No se pudo encontrar la página solicitada.',
      eyebrow: 'Error 404',
      title: 'Página no encontrada',
      intro: 'La dirección puede estar desactualizada o la página pudo haberse movido.'
    }
  },
  ja: {
    site: {
      title: 'ロボティクス・デジタルシステムエンジニア',
      description: '自律システム、認識、組込みソフトウェア、エンジニアリングツールに取り組むロボティクス・デジタルシステムエンジニア。',
      introduction:
        '認識と自律性からテレメトリ、データ、エンジニアリングツールまで、信頼できるロボットシステムとソフトウェアシステムを構築しています。試作やシミュレーションから実運用環境へ自然に移行できるシステムづくりに重点を置いています。',
      availability: 'ロボティクス、ソフトウェア、研究、大学院進学に関する機会を歓迎しています。',
      researchInterests: [
        'Sim-to-realロボティクスとデジタルツイン',
        '自律ロボティクス',
        'ロボットシステムのシミュレーションとモデリング',
        'SLAM、認識、センサー融合',
        '身体性AIとフィールドロボティクス',
        'ソフトロボティクスと柔軟機構'
      ],
      languages: [
        { language: '英語', proficiency: 'ネイティブレベル', detail: 'IELTS 8.5 · C2' },
        { language: 'スペイン語', proficiency: 'ネイティブレベル' },
        { language: '日本語', proficiency: '初級レベル' }
      ]
    },
    nav: { aria: 'メインナビゲーション', home: 'ホーム', portfolio: 'ポートフォリオ', cv: 'CV', contact: '連絡先' },
    language: { label: '言語', select: '言語を選択' },
    footer: { aria: 'フッターリンク', email: 'メール' },
    skipLink: '本文へスキップ',
    date: { present: '現在' },
    common: {
      portfolio: 'ポートフォリオ',
      cv: 'CV',
      contactLinks: '連絡先リンク',
      open: '開く',
      allItems: 'すべての項目',
      readItem: '項目を読む',
      verify: '確認',
      copy: 'コピー',
      copied: 'コピーしました',
      selectAndCopy: '選択してコピー',
      downloadPdf: 'PDFをダウンロード',
      externalSuffix: '↗'
    },
    home: {
      onThisPage: 'このページ',
      sections: {
        intro: '概要',
        featured: '注目',
        timeline: 'タイムライン',
        skills: 'スキル',
        languages: '言語',
        credentials: 'コースと認定資格'
      },
      researchInterests: '研究関心',
      timelineIntro: '時系列は新しいものから古いものへ並びます。並列レーンは同時期に進行した活動を示します。'
    },
    timeline: { concurrentWith: '同時期:', more: '件以上' },
    portfolioPage: {
      title: 'ポートフォリオ',
      description: 'プロジェクト、経験、学歴、受賞、社会貢献、継続学習の一覧。',
      intro: 'プロジェクト、経験、学歴、受賞、社会貢献などの完全な一覧です。',
      sectionsAria: 'ポートフォリオのセクション',
      controlsAria: 'ポートフォリオ表示コントロール',
      viewMode: '表示モード',
      timelineView: 'タイムライン',
      galleryView: 'ギャラリー',
      filterByType: '種類で絞り込み',
      allTypes: 'すべて',
      sortBy: '並び替え',
      latestSort: '新しい順',
      relevanceSort: '関連度',
      noThumbnail: 'サムネイルなし',
      openItem: '項目を開く'
    },
    itemPage: {
      breadcrumbAria: 'パンくずリスト',
      highlights: 'ハイライト',
      details: '詳細',
      media: 'メディア',
      skills: 'スキル',
      related: '関連項目',
      adjacentAria: '隣接するポートフォリオ項目',
      previous: '前へ',
      next: '次へ'
    },
    cvPage: {
      title: '履歴書',
      description: 'Aldrick TadeoがTypstで手作成したCVのプレビューとダウンロード。',
      intro: '完全版CV、エンジニアリング向け1ページ履歴書、アカデミック向け1ページ履歴書の複数の範囲があります。',
      previewAria: '履歴書プレビュー',
      variantsAria: 'CVの種類',
      previewing: 'プレビュー中:',
      fallback: 'このブラウザではPDFをインライン表示できません。',
      fallbackDownload: '選択したCVをダウンロード',
      variants: { engineering: 'エンジニアリング', academic: 'アカデミック', full: '完全版' }
    },
    contactPage: {
      title: '連絡先',
      description: 'Aldrick Tadeoの仕事用連絡先リンク。',
      eyebrow: '直接の連絡先',
      intro: 'ご連絡はメールが最適です。仕事用プロフィールは以下に掲載しています。'
    },
    notFound: {
      description: 'リクエストされたページが見つかりませんでした。',
      eyebrow: 'エラー404',
      title: 'ページが見つかりません',
      intro: 'アドレスが古いか、ページが移動した可能性があります。'
    }
  }
} as const;
