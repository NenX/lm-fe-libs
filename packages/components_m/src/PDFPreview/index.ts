import { lazy } from 'react'
const PDFPreview_View = lazy(() => import('./View'))
const IframeView = lazy(() => import('./IframeView'))
const ModalView = lazy(() => import('./ModalView'))
const ModalIframeView = lazy(() => import('./ModalIframeView'))
const Base64ModalIframeView = lazy(() => import('./Base64ModalframeView'))
const View = PDFPreview_View
const PDFPreview_Charts = {
  View,
  IframeView,
  ModalView,
  ModalIframeView,
  Base64ModalIframeView
};

export { PDFPreview_Charts, PDFPreview_View, IframeView, ModalView, ModalIframeView, Base64ModalIframeView };
