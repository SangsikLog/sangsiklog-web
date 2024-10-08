import {
  ArchiveIcon, ClipboardIcon
} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Home' },
  {
    title: '오늘의 상식',
    icon: ArchiveIcon,
    to: '/'
  },
  {
    title: '상식 둘러보기',
    icon: ClipboardIcon,
    to: '/knowledge'
  }
];

export default sidebarItem;
