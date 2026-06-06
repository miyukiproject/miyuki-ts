import { Breadcrumbs, BreadcrumbsProps } from "../Breadcrumbs";
import Footer from "../Footer";

type PageLayoutProps = {
  children: React.ReactNode
  lesson: any
} & BreadcrumbsProps

export const PageLayout = ({ children, lesson, ...breadcrumbProps }: PageLayoutProps) => {
  return <main className={`p-6 container`}>
    <Breadcrumbs {...breadcrumbProps} />
    {children}
    <Footer lesson={lesson} />
  </main>
}