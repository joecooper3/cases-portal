<?php
get_header(); ?>
<?php if ( !is_user_logged_in()) {
 }
 else { ?>

<?php $post = get_post();
    $archiveType = wp_get_post_terms($post->ID, 'commstax')[0]->slug;
    $archiveName = wp_get_post_terms($post->ID, 'commstax')[0]->name;
    if (substr($archiveName, -1) == 's') {
        $finalArchiveName = $archiveName;
    }
    else {
        $finalArchiveName = $archiveName.'s';
    }
     ?>

    <div id="primary"
    class="content-area"
    data-id="comms-archive"
    >
        <div id="comms-archive" data-id="<?php echo $archiveType; ?>">
        <div id="breadcrumbs">
            <a href="http://portal.cases.org/communications/">Communications</a>
            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
        </div>
				<?php
                    echo '<h1>'.$finalArchiveName.'</h1>';
				?>
        <div id="comms-archive-container">
            <i class="fa fa-circle-o-notch spinning" aria-hidden="true"></i>
        </div>
		</div><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer(); ?>
<?php } ?>