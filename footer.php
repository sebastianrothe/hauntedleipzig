<?php
/**
 * The template for displaying the footer.
 *
 * Contains footer content and the closing of the
 * #main and #page div elements.
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
?>
		<!-- Buchen Button -->
		<?php if (!isPageWithForm()) { ?>
		<a class="booknow-border" href="//gruseltour-leipzig.de/anmeldung">
			<span class="booknow-text">Gruseltour hier buchen!</span>
		</a>
		<?php } ?>
	</div><!-- #main .wrapper -->

	<footer id="colophon" role="contentinfo">
		<div class="site-info">
			<a href="//gruseltour-leipzig.de/impressum">Impressum</a>
			&nbsp;
			-
			&nbsp; 
			<a href="//gruseltour-leipzig.de/datenschutz">Datenschutz</a>
			<br />
			Gruseltour Leipzig made with <i class="fa fa-inverse fa-heart"></i>, <i class="fa fa-inverse fa-coffee"></i> and lots of Open Source in Leipzig.
			<br />
			<span class="pagespeed">Queries: <?php echo get_num_queries(); ?> Speed: <?php timer_stop(1); ?></span>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
