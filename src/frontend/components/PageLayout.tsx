import { Breadcrumbs, BreadcrumbsProps } from "../Breadcrumbs";
import Footer from "../Footer";

type PageLayoutProps = {
  children: React.ReactNode
  lesson?: any
  fullscreen?: boolean
} & BreadcrumbsProps

export const PageLayout = ({ children, lesson, ...breadcrumbProps }: PageLayoutProps) => {
  return <main className={`p-6 container`}>
    <Breadcrumbs {...breadcrumbProps} lesson={lesson} />
    {children}
    <Footer lesson={lesson} />
  </main>
}