import { inject, getCurrentInstance, ComponentInternalInstance } from 'vue'
import { Manager } from './manager'
import { metaInfoKey } from './symbols'
import { MetainfoActive, MetainfoInput, MetaProxy } from './types'

export function useMeta (obj: MetainfoInput, manager?: Manager): MetaProxy {
  const vm = getCurrentInstance()

  if (!manager && vm) {
    manager = getCurrentManager(vm)
  }

  if (!manager) {
    // oopsydoopsy
    throw new Error('No manager or current instance')
  }

  return manager.createMetaProxy(obj, vm || undefined)
}

export function useMetainfo (): MetainfoActive {
  return inject(metaInfoKey)!
}

export function getCurrentManager (vm?: ComponentInternalInstance): Manager {
  if (!vm) {
    vm = getCurrentInstance()!
  }

  return vm.appContext.config.globalProperties.$metaManager
}
