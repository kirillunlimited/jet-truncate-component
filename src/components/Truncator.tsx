import React, {useState, useEffect, useRef, useCallback} from 'react';
import styles from './Truncator.module.css';
import {debounce} from 'lodash';

type Props = {
  children: React.ReactNode;
  tailLength: number;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
};

const CONTEXT = document.createElement('canvas').getContext('2d');

const getCanvasContext = (): CanvasRenderingContext2D | null => {
  return CONTEXT;
}

const memo: Record<string, number> = {};

const getVisibleText = (options: {
  context: CanvasRenderingContext2D,
  containerWidth: number,
  text: string,
  index: number,
  tail: string,
  tailLength: number
}): {text: string, tail: string} => {
  const {context, containerWidth, text, index, tailLength} = options;
  let {tail} = options;

  let content = text;
  if (index !== 0) {
    tail = tail.slice(-tailLength);
    content += `... ${tail}`;
  }

  let textWidth = 0;
  if (memo[text]) {
    textWidth = memo[text];
  } else {
    textWidth = context.measureText(content).width;
    memo[text] = textWidth;
  }

  if (textWidth < containerWidth) {
    return {text, tail};
  }

  const textLastChar = text.substring(text.length - 1, text.length);

  return getVisibleText({
    ...options,
    text: text.substring(0, text.length - 1),
    index: index + 1,
    tail: `${textLastChar}${tail}`
  });
}

export default function Truncator(props: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [tailText, setTailText] = useState('');

  const calculateTrancation = useCallback(() => {
    if (!containerRef.current?.textContent || !textRef.current?.textContent) {
      return;
    }

    const context = getCanvasContext();
    if (!context) {
      return;
    }

    const computedStyles = window.getComputedStyle(containerRef.current);
    context.font = computedStyles.font;

    const containerWidth = containerRef.current.clientWidth;
    const {tail} = getVisibleText({
      context,
      containerWidth,
      text: textRef.current.textContent,
      index: 0,
      tail: '',
      tailLength: props.tailLength
    });
    setTailText(tail);
  }, [props.tailLength]);

  const onResize = useCallback(() => {
    calculateTrancation();
  }, [calculateTrancation]);

  const debouncedOnResize = useCallback(() => debounce(onResize, 0), [onResize]);

  useEffect(() => {
    calculateTrancation();
    window.addEventListener('resize', debouncedOnResize);

    return () => {
      window.removeEventListener('resize', debouncedOnResize);
    }
  }, [calculateTrancation, debouncedOnResize]);

  return (
    <div
      ref={containerRef}
      className={`${props.className} ${styles.container}`}
      title={props.title}
      style={props.style}
      data-testid="truncator"
    >
      <span
        className={styles.mainText}
        ref={textRef}
      >
        {props.children}
      </span>
      {tailText && <span className={styles.tail}>{tailText}</span>}
    </div>
  );
}