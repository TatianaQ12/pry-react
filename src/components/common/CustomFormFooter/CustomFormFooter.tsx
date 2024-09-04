import { Button } from 'antd';

export const CustomFormFooter = (props: any) => {
    const {
        confirmText, onConfirm, cancelText, onCancel, cancelColor, confirmColor, className, backgroundColor, buttonType,
        secondaryText, onSecondaryConfirm, clearState, disabled, loading
    } = props;

    return (
        <div className={className || "modal-footer"} style={{ position: 'sticky', bottom: 0, padding: '16px', background: '#f9f9f9', display: 'flex', justifyContent: 'flex-end' }}>
            {cancelText && (
                <Button onClick={() => { onCancel && onCancel(); clearState && clearState() }} type="default" style={{ marginRight: '8px' }} disabled={disabled}>
                    {cancelText}
                </Button>
            )}
            {secondaryText && (
                <Button onClick={onSecondaryConfirm} type="primary" style={{ marginRight: '8px' }}>
                    {secondaryText}
                </Button>
            )}
            {confirmText && (
                <Button onClick={onConfirm} type="primary" disabled={disabled} loading={loading}>
                    {confirmText}
                </Button>
            )}
        </div>
    );
};
