import { ReactComponent as HomeIcon } from '@svg/house-door-fill.svg'
import { Link } from 'react-router-dom'

export interface IPathElement {
  label: string
  linkTo?: string
}
export default function Breadcrumbs({ className, path }: { className?: string; path: IPathElement[] }) {
  return (
    <div className={(className ?? '') + ' flex w-min p-1 gap-1.5 text-xs items-center'}>
      <HomeIcon className="opacity-60" width={16} height={16} />
      {path.map((pathEl, i) => (
        <>
          <div className="opacity-60">{'>'}</div>
          <Link
            to={pathEl.linkTo ?? '#'}
            className={cx('hover:underline whitespace-nowrap', {
              'opacity-100 text-primary-600': i === path.length - 1,
              'opacity-60': i !== path.length - 1,
            })}
          >
            {pathEl.label}
          </Link>
        </>
      ))}
    </div>
  )
}
