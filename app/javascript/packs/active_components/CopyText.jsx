// <CopyText
//   clipboardText={`${window.location.origin}?yi=${yearIncome}&wi=${welfareIncome}&mt=${monthTaxFree}&ii=${incentiveIncome}&wh=${weeklyHours}&vd=${vacationDays}`}
// buttonText={"링크공유"}
// buttonClass={"text-gray-700 cursor-pointer hover:text-yellow-500"}/>
import React, {useEffect, useRef} from "react";
import ClipboardJS from 'clipboard';

function CopyText({clipboardText, buttonText, buttonClass}) {
  const targetText = useRef(null);
  let clipboard;

  useEffect(() => {
    clipboard = new ClipboardJS(targetText.current);
    return () => {
      clipboard.destroy()
    }
  }, []);

  const onClickCopy = (e) => {
    const prevText = targetText.current.innerText;
    targetText.current.disabled = true;
    targetText.current.innerText = "✅복사됨";

    setTimeout((e) => {
      targetText.current.innerText = prevText;
      targetText.current.disabled = false;
    }, 300)
  };

  return (
    <button className={buttonClass}
         ref={targetText}
         onClick={onClickCopy}
         data-clipboard-text={clipboardText}>{buttonText}
    </button>
  )
}

export default CopyText;