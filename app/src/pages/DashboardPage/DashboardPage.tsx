import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { listChildren, addChild, type Child } from '../../lib/children'
import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import ChildSwitcher from '../../components/dashboard/ChildSwitcher/ChildSwitcher'
import AddChildForm from '../../components/dashboard/AddChildForm/AddChildForm'
import LevelMap from '../../components/dashboard/LevelMap/LevelMap'
import styles from './DashboardPage.module.css'

function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const [children, setChildren] = useState<Child[]>([])
  const [loadingChildren, setLoadingChildren] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    if (!user) return
    listChildren()
      .then((data) => {
        setChildren(data)
        if (data.length > 0) setActiveId(data[0].id)
      })
      .finally(() => setLoadingChildren(false))
  }, [user])

  if (!authLoading && !user) {
    return <Navigate to="/" replace />
  }

  async function handleAddChild(name: string, heroKey: string) {
    const child = await addChild(name, heroKey)
    setChildren((prev) => [...prev, child])
    setActiveId(child.id)
    setShowAddForm(false)
  }

  const activeChild = children.find((c) => c.id === activeId)

  return (
    <>
      <Header onOpenAuth={() => {}} />
      <div className="wrap">
        <section className={styles.section}>
          {loadingChildren ? (
            <p className={styles.loading}>لحظة بنجهّزلك كل حاجة...</p>
          ) : children.length === 0 || showAddForm ? (
            <AddChildForm
              onSubmit={handleAddChild}
              onCancel={children.length > 0 ? () => setShowAddForm(false) : undefined}
            />
          ) : (
            <>
              <ChildSwitcher
                children={children}
                activeId={activeId ?? ''}
                onSelect={setActiveId}
                onAddChild={() => setShowAddForm(true)}
              />
              {activeChild && (
                <>
                  <h2 className={styles.heading}>يلا يا {activeChild.name}، اختار مستوى! 🌟</h2>
                  <LevelMap />
                </>
              )}
            </>
          )}
        </section>
      </div>
      <Footer />
    </>
  )
}

export default DashboardPage
