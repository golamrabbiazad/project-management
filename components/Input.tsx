import clsx from 'clsx'

export interface InputProps {
  placeholder: string
  value: string
  type?: string
  required?: boolean
  className?: string
  onChange: (e: any) => void
}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full',
        className
      )}
      {...props}
    />
  )
}
