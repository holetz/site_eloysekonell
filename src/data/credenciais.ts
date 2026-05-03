/**
 * Fonte única de verdade para dados factuais de Eloyse Konell.
 *
 * IMPORTANTE: Nunca duplicar estes valores em outros arquivos .astro ou .md.
 * Sempre importar daqui: `import { credenciais } from '@/data/credenciais';`
 * ou com caminho relativo `../../data/credenciais`.
 */
export const credenciais = {
  /** Quantidade de anos atuando na área */
  anosAtuacao: 18,

  /** Número mínimo de empresas atendidas */
  empresasAtendidas: 15,

  /** Número mínimo de líderes desenvolvidos */
  lideresDesenvolvidos: 500,

  /** Número mínimo de assessments realizados */
  assessmentsRealizados: 500,

  localizacao: {
    cidade: 'Blumenau',
    estado: 'SC',
    regiao: 'Vale do Itajaí',
    pais: 'BR',
  },

  /**
   * Formação acadêmica e certificações, em ordem cronológica.
   * tipo: 'graduacao' | 'pos' | 'mba' | 'certificacao'
   */
  formacao: [
    {
      tipo: 'graduacao',
      titulo: 'Graduação em Psicologia',
      instituicao: 'Universidade Regional de Blumenau',
      sigla: 'FURB',
    },
    {
      tipo: 'pos',
      titulo: 'Pós-graduação Lato Sensu em Gestão de Pessoas',
      instituicao: 'Universidade Regional de Blumenau',
      sigla: 'FURB',
    },
    {
      tipo: 'mba',
      titulo: 'MBA em Neurociência e Comportamento',
      instituicao: 'Pontifícia Universidade Católica do Rio Grande do Sul',
      sigla: 'PUCRS',
    },
    {
      tipo: 'certificacao',
      titulo: 'Certificação PCC® — Professional Certified Coach',
      instituicao: 'Sociedade Latino-Americana de Coaching',
      sigla: 'SLAC',
    },
    {
      tipo: 'certificacao',
      titulo: 'Certificação em Governança Corporativa em Empresas Familiares',
      instituicao: 'Instituto Brasileiro de Governança Corporativa',
      sigla: 'IBGC',
    },
    {
      tipo: 'certificacao',
      titulo: 'Certificação em Análise Comportamental Avançada',
      instituicao: 'GROU',
      sigla: 'GROU',
    },
  ],

  /** Áreas de conhecimento para Person.knowsAbout no JSON-LD */
  areasConhecimento: [
    'Desenvolvimento de líderes',
    'Gestão estratégica de pessoas',
    'Análise comportamental',
    'Assessment executivo',
    'Sucessão em empresas familiares',
    'Governança corporativa',
    'Coaching executivo',
    'Neurociência e comportamento',
  ],

  /** Instituições de ensino para Person.alumniOf no JSON-LD */
  alumniOf: [
    {
      name: 'FURB',
      url: 'https://www.furb.br/',
    },
    {
      name: 'PUCRS',
      url: 'https://www.pucrs.br/',
    },
  ],
} as const;
