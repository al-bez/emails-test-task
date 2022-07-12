import { FC } from 'react'
import './Button.scss'

interface ButtonProps {
    text: string;
    background?: string;
    width?: number;
    onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ text, background = '#7c7c7c', width = 100, onClick }) => {
    return (
        <button style={{ background, width }} className="button" onClick={onClick}>
            {text}
        </button>
    )
}

export default Button