<template name="Welcome">
  <!-- Unlogged users -->
  <div class="container unlogged-users">
    <div class="row">
      <!-- Intro block -->
      <div class="col-md-12 text-center">
        <p class="welcome-sub-text">{{ $t("welcome.description") }}</p>
        <video class="einblik-welcome-video" controls="" autoplay>
          <source src="/video/eb01.mp4" type="video/mp4" />
        </video>
        <br />
      </div>
    </div>
    <!-- End Intro block -->
  </div>
  <!-- End Unlogged users -->
</template>

<script>
export default {
  name: "Welcome"
};
</script>
