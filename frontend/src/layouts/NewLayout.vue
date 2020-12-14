<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
         LOGO
        </q-toolbar-title>
        <q-item>
          <div>
            <q-btn-dropdown color="primary" label="User">
              <q-list>
                <q-item clickable >
                  <q-item-section>
                    <q-item-label>
                      <q-btn to="/user/settings" flat>
                        Settings
                      </q-btn>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
          </q-btn-dropdown>
        </div>
        </q-item>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'NewLayout',
  data () {
    return {
    }
  }
}
</script>
