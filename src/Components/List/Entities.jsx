import { useContext } from 'react'
import { ListContext } from 'Contexts'
import Cards from './EntitiesCards'
import Table from './EntitiesTable'
import Tree from './EntitiesTree'
import BlurredProgress from '../BlurredProgress'

const Entities = () => {

    const {
        card,
        isBrowse,
        isTree,
        loading,
    } = useContext(ListContext)

    return <div id='items' className={
        'bg-white dark:bg-zinc-700 transition-colors md:rounded-lg flex flex-col items-center justify-center relative'
        + (!isBrowse && ' py-6 ')
        + (card && " flex-col")
    }
        style={{
            maxWidth: '100vw'
        }}
    >
        <div className={'w-full ' + (loading && ' blur-sm ')}>
            {
                isTree
                    ?
                    <Tree />
                    :
                    card
                        ?
                        <Cards />
                        :
                        <Table />

            }
        </div>
        {
            loading &&
            <BlurredProgress opacity='opacity-50' />
        }
    </div>
}

export default Entities
