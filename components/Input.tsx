import clsx from 'clsx'

export default function Input({ className, ...props }) {
  return (
    <div
      className={clsx(
        'border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full',
        className
      )}
    >
      {...props}
    </div>
  )
}
