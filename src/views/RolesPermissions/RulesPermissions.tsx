/* eslint-disable indent */
import { useRuleStore } from '@/hooks/useRuleStore'
import { useEffect, useState } from 'react'
import { Rule } from '@/types/slices/ruleType'
import { useStyleModeStore } from '@/hooks/useStyleModeStore'
import { ViewsDisabled } from './components/ViewsDisabled'
import { ViewsEnabled } from './components/ViewsEnabled'
import { CodeColor } from '@/types/colors/colors'
import { ConfirmDialog } from '@/components/common/DialogConfirm'
import { Button, Card, Col, Row, Skeleton, Tabs, Tag } from 'antd'

const TabPanel = ({ value, index, children }) => {
  return value === index ? children : null;
};

type Dialog = {
  open: boolean
  title: string
  confirm: boolean
  message: string
}

export const RulesPermissions: React.FC = () => {
  const { getRule, getViewFrontIdrole, setSelectRule, rules, selectedRule } = useRuleStore()
  const { modeStyle } = useStyleModeStore()
  const [rows, setRows] = useState<Rule[]>([])
  const [value, setValue] = useState(0)
  const [Dialog, setDialog] = useState<Dialog>({
    open: false,
    title: 'refrescar página',
    confirm: false,
    message: 'confirmar',
  })

  useEffect(() => {
    if (rules?.length === 0) {
      getRule()
    }
  }, [])

  useEffect(() => {
    if (rules.length > 0) {
      setRows(rules)
      setSelectRule(rules[0])
    }
  }, [rules])

  useEffect(() => {
    if (selectedRule?.id) {
      getViewFrontIdrole(selectedRule?.id)
    }
  }, [selectedRule])

  const handleClick = (item) => {
    setSelectRule(item)
  }

  const refresh = () => {
    setDialog(prev => ({
      ...prev,
      message: '¿Desea refrescar página?',
      open: true,
      confirm: true,
    }))
  }

  const OnCancel = async () => {
    try {
      setDialog(prev => ({
        ...prev,
        open: false,
        confirm: false
      }))
    } catch (e) {
      console.log(e)
    }
  }

  const OnConfirm = async () => {
    try {
      const { confirm } = Dialog
      if (confirm == true) {
        window.location.reload();
        setDialog(prev => ({
          ...prev,
          open: false,
          confirm: false
        }))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const notRender = () => {
    const array = [1, 2, 3, 4, 5]
    return (
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {array.map((_, index) => (
          <div key={index} style={{ margin: '8px' }}>
            <Skeleton.Button
              active
              size="large"
              style={{ width: '100px', height: '30px', borderRadius: '6px', backgroundColor: '#f0f0f0' }}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} style={{ textAlign: 'right' }}>
        <Button type="primary" onClick={refresh}>Refrescar página</Button>
      </Col>
      <Col xs={24}>
        <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'}>
          {rows?.length === 0 ?
            notRender() :
            <Row justify="center">
              {rows.map((item, index) => {
                const variant = selectedRule?.id === item?.id ? 'primary' : 'default';
                return (
                  <Col key={index} style={{ marginBottom: '8px' }}>
                    <Tag
                      color={variant === 'primary' ? 'blue' : undefined}
                      onClick={() => handleClick(item)}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '16px',
                        padding: '6px 12px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {item?.name}
                    </Tag>
                  </Col>
                );
              })}
            </Row>
          }
        </Card>
        {selectedRule?.id ? (
          <>
            <h5 style={{ color: modeStyle === 'light' ? CodeColor.TEXT_LIGHT : CodeColor.TEXT_DARK }}>Vistas / Permisos</h5>
            <Card className={modeStyle === 'light' ? 'card-light' : 'card-dark'} bordered={true}>
              <div style={{ width: '100%' }}>
                <Tabs
                  activeKey={value.toString()}
                  onChange={(activeKey) => setValue(parseInt(activeKey, 10))}
                  tabBarStyle={{ background: modeStyle === 'light' ? '#f9f9f9' : '#1A1C1E', color: modeStyle === 'light' ? '#000' : '#fff' }}
                >
                  <Tabs.TabPane tab="Habilitados" key="0" />
                  <Tabs.TabPane tab="No habilitados" key="1" />
                </Tabs>
                <div>
                  <TabPanel value={value} index={0}>
                    <ViewsEnabled />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <ViewsDisabled />
                  </TabPanel>
                </div>
              </div>
            </Card>
          </>
        ) : null}
      </Col>
      {
        <ConfirmDialog
          open={Dialog.open}
          title={Dialog.title}
          message={Dialog.message}
          onConfirm={() => OnConfirm()}
          onClose={() => OnCancel()}
        />
      }
    </Row>
  )
}