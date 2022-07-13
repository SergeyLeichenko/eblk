<template name="AppFooter">
  <div class="eblk-footer">
    <div class="container">
      <div class="eblk-row">
        <div class="col-md-12">
          <ul class="list-unstyled eblk-list-inline text-center">
            <li>
              <router-link to="/terms">Terms of Service</router-link>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFooter"
};
</script>
